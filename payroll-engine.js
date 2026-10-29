// Payroll calculation engine
const PayrollEngine = {
    // Convert legacy saved data without changing its original fields.
    normalizeEmployee(employee) {
        const normalized = { ...employee };
        if (normalized.position === 'GV' && normalized.type === 'Part-time' && normalized.ratePerSession == null) {
            normalized.ratePerSession = Number(normalized.fixedSalary || 0);
        }
        if ((normalized.position === 'HCNS' || normalized.position === 'Content') && normalized.monthlyPackage == null) {
            normalized.monthlyPackage = Number(normalized.fixedSalary || 0);
        }
        return normalized;
    },

    isBhxhOnlyForMonth(employee, payrollMonth) {
        return employee.status === 'bhxh-only' || Boolean(employee.bhxhOnlyFrom && payrollMonth && payrollMonth >= employee.bhxhOnlyFrom);
    },

    // Calculate Part-time salary
    calculatePartTimeSalary(employee, sessions) {
        const ratePerSession = Number(employee.ratePerSession || employee.fixedSalary || 0);
        return {
            sessions: sessions,
            ratePerSession: ratePerSession,
            total: sessions * ratePerSession,
            grossSalary: sessions * ratePerSession,
            type: 'part-time'
        };
    },
    
    // Calculate Kem (tutoring) class salary
    calculateKemSalary(sessions, pricePerSession) {
        return {
            sessions: sessions,
            ratePerSession: pricePerSession,
            total: sessions * pricePerSession,
            type: 'kem'
        };
    },
    
    // Calculate Full-time teacher salary with KPI
    calculateFullTimeSalary(employee, regularClassCount, kemDetails, kpiScore, settings) {
        // Regular classes: level × 8 sessions × class count
        const totalRegularSalary = employee.level * settings.sessionsPerMonth * regularClassCount;
        
        // Split into fixed (70%) and KPI fund (30%)
        const fixedSalary = Math.round(totalRegularSalary * (settings.fixedSalaryRatio / 100));
        const kpiFund = totalRegularSalary - fixedSalary;
        
        // KPI multiplier based on score
        const kpiMultiplier = this.getKPIMultiplier(kpiScore);
        const kpiAmount = Math.round(kpiFund * kpiMultiplier);
        
        // Calculate Kem classes if any
        let kemTotal = 0;
        if (kemDetails && kemDetails.length > 0) {
            kemTotal = kemDetails.reduce((sum, kem) => sum + kem.total, 0);
        }
        
        const grossSalary = fixedSalary + kpiAmount + kemTotal;
        
        return {
            type: 'full-time',
            regularClassCount: regularClassCount,
            level: employee.level,
            totalRegularSalary: totalRegularSalary,
            fixedSalary: fixedSalary,
            kpiFund: kpiFund,
            kpiScore: kpiScore,
            kpiMultiplier: kpiMultiplier,
            kpiAmount: kpiAmount,
            kemClasses: kemDetails || [],
            kemTotal: kemTotal,
            grossSalary: grossSalary
        };
    },
    
    // Calculate office staff salary (monthly package)
    calculateOfficeSalary(employee) {
        const monthlyPackage = Number(employee.monthlyPackage || employee.fixedSalary || 0);
        return {
            type: 'office',
            monthlyPackage: monthlyPackage,
            grossSalary: monthlyPackage
        };
    },
    
    // Calculate Content staff salary (monthly package)
    calculateContentSalary(employee) {
        const monthlyPackage = Number(employee.monthlyPackage || employee.fixedSalary || 0);
        return {
            type: 'content',
            monthlyPackage: monthlyPackage,
            grossSalary: monthlyPackage
        };
    },
    
    // Get KPI multiplier based on the approved salary rule.
    getKPIMultiplier(score) {
        if (score >= 85) return 1.0;
        if (score >= 70) return 0.75;
        if (score >= 50) return 0.5;
        return 0;
    },
    
    // Calculate BHXH deduction
    calculateBHXH(employee, settings, isDirector = false) {
        if (!employee.bhxh) {
            return {
                employeeContribution: 0,
                companyContribution: 0,
                total: 0
            };
        }
        
        const base = employee.bhxhBase || 5100000;
        const employeeRate = settings.bhxhEmployeeRate / 100;
        const companyRate = settings.bhxhCompanyRate / 100;
        
        // Special case for director
        if (isDirector) {
            const employeeContribution = Math.round(base * employeeRate);
            return {
                employeeContribution: employeeContribution,
                companyContribution: settings.bhxhDirector - employeeContribution,
                total: settings.bhxhDirector,
                note: `Chênh ${settings.bhxhDirector - Math.round(base * (employeeRate + companyRate))}đ`
            };
        }
        
        return {
            employeeContribution: Math.round(base * employeeRate),
            companyContribution: Math.round(base * companyRate),
            total: Math.round(base * (employeeRate + companyRate))
        };
    },
    
    // Calculate net salary (after BHXH deduction)
    calculateNetSalary(grossSalary, bhxhDeduction, adjustments = 0) {
        return grossSalary - bhxhDeduction + adjustments;
    },
    
    // Generate payroll for one employee
    generateEmployeePayroll(rawEmployee, monthData, settings, payrollMonth = '') {
        const employee = this.normalizeEmployee(rawEmployee);
        let salaryDetail = null;
        const isDirector = employee.id === 1; // Trương Tuấn Ngọc
        
        // Skip if employee status is inactive
        if (employee.status === 'inactive') {
            return null;
        }
        
        // BHXH-only applies only from the configured payroll month.
        if (this.isBhxhOnlyForMonth(employee, payrollMonth)) {
            const bhxh = this.calculateBHXH(employee, settings, isDirector);
            return {
                employeeId: employee.id,
                employeeName: employee.name,
                employeeCode: employee.code,
                position: employee.position,
                type: employee.type,
                status: employee.status,
                salaryDetail: { type: 'bhxh-only', grossSalary: 0 },
                bhxh: bhxh,
                adjustments: 0,
                netSalary: -bhxh.employeeContribution,
                note: 'BHXH tự nguyện'
            };
        }
        
        // Calculate based on position/type
        if (employee.position === 'GV' && employee.type === 'Full-time') {
            const regularClasses = monthData.regularClasses || 0;
            const kemClasses = monthData.kemClasses || [];
            const kpiScore = monthData.kpiScore !== undefined ? monthData.kpiScore : employee.kpiDefault;
            
            salaryDetail = this.calculateFullTimeSalary(
                employee,
                regularClasses,
                kemClasses,
                kpiScore,
                settings
            );
        } else if (employee.position === 'GV' && employee.type === 'Part-time') {
            const sessions = monthData.sessions || 0;
            salaryDetail = this.calculatePartTimeSalary(employee, sessions);
        } else if (employee.position === 'HCNS') {
            salaryDetail = this.calculateOfficeSalary(employee);
        } else if (employee.position === 'Content') {
            salaryDetail = this.calculateContentSalary(employee);
        }
        
        const bhxh = this.calculateBHXH(employee, settings, isDirector);
        const adjustments = monthData.adjustments || 0;
        const netSalary = this.calculateNetSalary(
            salaryDetail.grossSalary,
            bhxh.employeeContribution,
            adjustments
        );
        
        return {
            employeeId: employee.id,
            employeeName: employee.name,
            employeeCode: employee.code,
            position: employee.position,
            type: employee.type,
            status: employee.status,
            salaryDetail: salaryDetail,
            bhxh: bhxh,
            adjustments: adjustments,
            netSalary: netSalary,
            note: monthData.note || ''
        };
    },
    
    // Generate full payroll for a month
    generateMonthPayroll(employees, payrollData, settings, payrollMonth = '') {
        const results = [];
        let totalGross = 0;
        let totalBHXHEmployee = 0;
        let totalBHXHCompany = 0;
        let totalNet = 0;
        
        employees.forEach(employee => {
            const monthData = payrollData[employee.id] || {};
            const payroll = this.generateEmployeePayroll(employee, monthData, settings, payrollMonth);
            
            if (payroll) {
                results.push(payroll);
                totalGross += payroll.salaryDetail.grossSalary;
                totalBHXHEmployee += payroll.bhxh.employeeContribution;
                totalBHXHCompany += payroll.bhxh.companyContribution;
                totalNet += payroll.netSalary;
            }
        });
        
        return {
            employees: results,
            summary: {
                totalGross: totalGross,
                totalBHXHEmployee: totalBHXHEmployee,
                totalBHXHCompany: totalBHXHCompany,
                totalBHXH: totalBHXHEmployee + totalBHXHCompany,
                totalNet: totalNet,
                totalCost: totalGross + totalBHXHCompany
            }
        };
    }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PayrollEngine;
}

function app() {
    return {
        // State
        currentView: 'dashboard',
        showBackup: false,
        currentMonth: new Date().toISOString().slice(0, 7), // YYYY-MM
        selectedPayrollMonth: null,
        
        // Data
        employees: [],
        classes: [],
        payrollMonths: [],
        bhxhParticipants: [],
        leaveBalances: [],
        
        // Settings
        settings: {
            bhxhDirector: 1504500, // Trương Tuấn Ngọc
            fixedSalaryRatio: 70, // 70% lương cứng, 30% KPI
            sessionsPerMonth: 8,
            defaultKemPrice: 100000,
            bhxhEmployeeRate: 10.5, // %
            bhxhCompanyRate: 21.5, // %
            version: '1.1.0'
        },
        
        // Monthly tasks reminder
        monthlyTasks: [
            { text: 'Thu thập chấm công và số buổi dạy của giáo viên Part-time', done: false },
            { text: 'Nhập số buổi lớp kèm (nếu có)', done: false },
            { text: 'Nhập điểm KPI của giáo viên Full-time', done: false },
            { text: 'Kiểm tra và điều chỉnh phép (nếu cần)', done: false },
            { text: 'Xem trước và xác nhận bảng lương', done: false },
            { text: 'Xuất file Excel và PDF phiếu lương', done: false },
            { text: 'Chuyển khoản lương cho nhân viên', done: false },
            { text: 'Chuyển khoản BHXH (2 lệnh riêng)', done: false },
            { text: 'Tải backup dữ liệu và lưu vào Drive', done: false }
        ],
        
        // Init
        init() {
            this.loadFromLocalStorage();
            this.initSampleData();
            this.migrateData();
            this.calculateBHXH();
            this.saveToLocalStorage();
        },
        
        // Initialize sample data (only if empty)
        initSampleData() {
            if (this.employees.length === 0) {
                this.employees = [
                    {
                        id: 1,
                        code: 'NV0101',
                        name: 'Trương Tuấn Ngọc',
                        position: 'GV',
                        type: 'Full-time',
                        level: 5,
                        fixedSalary: 0, // Calculated from classes
                        status: 'active',
                        bhxh: true,
                        bhxhBase: 5100000,
                        kpiDefault: 100
                    },
                    {
                        id: 2,
                        code: 'NV2301',
                        name: 'Nguyễn Thị Uyên Vi',
                        position: 'GV',
                        type: 'Full-time',
                        level: 5,
                        fixedSalary: 0,
                        status: 'active',
                        bhxh: true,
                        bhxhBase: 10000000,
                        kpiDefault: 100
                    },
                    {
                        id: 3,
                        code: 'NV2707',
                        name: 'Lê Đức Anh',
                        position: 'GV',
                        type: 'Full-time',
                        level: 5,
                        fixedSalary: 0,
                        status: 'active',
                        bhxh: true,
                        bhxhBase: 5100000,
                        kpiDefault: 85
                    },
                    {
                        id: 4,
                        code: 'NV1308',
                        name: 'Nguyễn Hồng Anh',
                        position: 'GV',
                        type: 'Full-time',
                        level: 5,
                        fixedSalary: 0,
                        status: 'active',
                        bhxhOnlyFrom: '2026-11',
                        bhxh: true,
                        bhxhBase: 5100000,
                        bhxhVoluntary: true, // Chỉ BHXH từ tháng 11/2026 theo kỳ lương
                        kpiDefault: 85
                    },
                    {
                        id: 5,
                        code: 'NV0904',
                        name: 'Phạm Hoàng Khánh Vân',
                        position: 'GV',
                        type: 'Full-time',
                        level: 6,
                        fixedSalary: 0,
                        status: 'active',
                        bhxh: true,
                        bhxhBase: 5100000,
                        kpiDefault: 85
                    },
                    {
                        id: 6,
                        code: 'NV2412',
                        name: 'Nguyễn Ngọc Bảo Trâm',
                        position: 'GV',
                        type: 'Part-time',
                        level: 3,
                        ratePerSession: 150000,
                        fixedSalary: 150000, // Giữ để tương thích dữ liệu cũ
                        status: 'active',
                        bhxh: false
                    },
                    {
                        id: 7,
                        code: 'NV2503',
                        name: 'Trần Bảo Hạnh Nhung',
                        position: 'GV',
                        type: 'Part-time',
                        level: 2,
                        ratePerSession: 120000,
                        fixedSalary: 120000, // Giữ để tương thích dữ liệu cũ
                        status: 'active',
                        bhxh: false
                    },
                    {
                        id: 8,
                        code: 'NV0204',
                        name: 'Huỳnh Thuỵ Vân Anh',
                        position: 'HCNS',
                        type: 'Full-time',
                        level: 0,
                        monthlyPackage: 9200000,
                        fixedSalary: 9200000, // Giữ để tương thích dữ liệu cũ
                        status: 'active',
                        bhxh: true,
                        bhxhBase: 5100000
                    },
                    {
                        id: 9,
                        code: 'NV0801',
                        name: 'Trần Đặng Chí Khôi',
                        position: 'Content',
                        type: 'Monthly-package',
                        level: 0,
                        monthlyPackage: 1600000,
                        fixedSalary: 1600000, // Giữ để tương thích dữ liệu cũ
                        status: 'active',
                        bhxh: false
                    }
                ];
            }
            
            if (this.classes.length === 0) {
                this.classes = [
                    { id: 1, code: 'KEM-DUC', name: 'Kem-Đức', type: 'Kèm', teacherId: 3, price: 100000 },
                    { id: 2, code: 'KEM-NGUYEN-TUAN', name: 'Kem-Nguyen & Tuan Anh', type: 'Kèm', teacherId: 3, price: 100000 },
                    { id: 3, code: 'KEM-KHOI', name: 'Kem-Khoi', type: 'Kèm', teacherId: 3, price: 100000 }
                ];
            }
            
            // Initialize leave balances for all employees
            if (this.leaveBalances.length === 0) {
                this.employees.forEach(emp => {
                    this.leaveBalances.push({
                        employeeId: emp.id,
                        initial: 12,
                        added: 0,
                        used: 0,
                        balance: 12
                    });
                });
            }
            
            this.saveToLocalStorage();
        },
        
        // Calculate BHXH
        calculateBHXH() {
            this.bhxhParticipants = [];
            
            this.employees.forEach(emp => {
                if (emp.bhxh) {
                    const base = emp.bhxhBase || 5100000;
                    const employeeRate = this.settings.bhxhEmployeeRate / 100;
                    const companyRate = this.settings.bhxhCompanyRate / 100;
                    
                    // Special case for director
                    if (emp.id === 1) {
                        this.bhxhParticipants.push({
                            employeeId: emp.id,
                            baseSalary: base,
                            employeeContribution: Math.round(base * employeeRate),
                            companyContribution: this.settings.bhxhDirector - Math.round(base * employeeRate),
                            total: this.settings.bhxhDirector,
                            note: `Chênh ${this.formatMoney(this.settings.bhxhDirector - Math.round(base * (employeeRate + companyRate)))} để anh cân đối`
                        });
                    } else {
                        this.bhxhParticipants.push({
                            employeeId: emp.id,
                            baseSalary: base,
                            employeeContribution: Math.round(base * employeeRate),
                            companyContribution: Math.round(base * companyRate),
                            total: Math.round(base * (employeeRate + companyRate)),
                            note: emp.bhxhVoluntary ? 'BHXH tự nguyện' : ''
                        });
                    }
                }
            });
        },
        
        calculateTotalBHXH(type) {
            if (type === 'regular') {
                return this.bhxhParticipants
                    .filter(b => b.employeeId !== 1)
                    .reduce((sum, b) => sum + b.total, 0);
            } else if (type === 'director') {
                const director = this.bhxhParticipants.find(b => b.employeeId === 1);
                return director ? director.total : 0;
            }
            return 0;
        },
        
        getBHXHContent(type, month) {
            const [year, monthNum] = month.split('-');
            const companyName = 'CONG TY TNHH TRUNG TAM ANH VAN JOY';
            
            if (type === 'regular') {
                return `TZ1121Z ${monthNum}/${year} ${companyName}`;
            } else if (type === 'director') {
                return `Q60460Z ${monthNum}/${year} TRUONG TUAN NGOC`;
            }
            return '';
        },
        
        migrateData() {
            this.employees = this.employees.map(emp => {
                const migrated = { ...emp };
                if (migrated.position === 'GV' && migrated.type === 'Part-time' && migrated.ratePerSession == null) {
                    migrated.ratePerSession = Number(migrated.fixedSalary || 0);
                }
                if ((migrated.position === 'HCNS' || migrated.position === 'Content') && migrated.monthlyPackage == null) {
                    migrated.monthlyPackage = Number(migrated.fixedSalary || 0);
                }
                if (migrated.id === 4 && migrated.status === 'bhxh-only' && !migrated.bhxhOnlyFrom) {
                    migrated.status = 'active';
                    migrated.bhxhOnlyFrom = '2026-11';
                }
                return migrated;
            });
        },

        getSalaryLabel(emp) {
            if (emp.position === 'GV' && emp.type === 'Full-time') return 'Tính theo bậc & lớp';
            if (emp.position === 'GV' && emp.type === 'Part-time') return `Đơn giá/buổi: ${this.formatMoney(emp.ratePerSession || emp.fixedSalary)}`;
            return `Gói lương/tháng: ${this.formatMoney(emp.monthlyPackage || emp.fixedSalary)}`;
        },

        // Calculate KPI percentage
        getKPIMultiplier(kpiScore) {
            return PayrollEngine.getKPIMultiplier(kpiScore);
        },
        
        // Calculate Full-time teacher salary
        calculateFullTimeSalary(employee, classCount, kpi) {
            const totalSalary = employee.level * this.settings.sessionsPerMonth * classCount;
            const fixedPart = Math.round(totalSalary * (this.settings.fixedSalaryRatio / 100));
            const kpiFund = totalSalary - fixedPart;
            const kpiMultiplier = this.getKPIMultiplier(kpi || employee.kpiDefault || 85);
            const kpiAmount = Math.round(kpiFund * kpiMultiplier);
            
            return {
                total: fixedPart + kpiAmount,
                fixed: fixedPart,
                kpiFund: kpiFund,
                kpiAmount: kpiAmount,
                kpiScore: kpi || employee.kpiDefault || 85
            };
        },
        
        // Helpers
        formatMoney(amount) {
            if (!amount && amount !== 0) return '-';
            return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
        },
        
        getEmployeeName(id) {
            const emp = this.employees.find(e => e.id === id);
            return emp ? emp.name : 'N/A';
        },
        
        getStatusText(status) {
            const map = {
                'active': 'Hoạt động',
                'inactive': 'Nghỉ việc',
                'bhxh-only': 'Chỉ BHXH'
            };
            return map[status] || status;
        },
        
        shouldShowReminder() {
            const today = new Date();
            const day = today.getDate();
            return day >= 25; // Show reminder from 25th onwards
        },
        
        // CRUD Operations
        addEmployee() {
            const newId = Math.max(...this.employees.map(e => e.id), 0) + 1;
            const newEmp = {
                id: newId,
                code: `NV${String(newId).padStart(4, '0')}`,
                name: 'Nhân viên mới',
                position: 'GV',
                type: 'Full-time',
                level: 3,
                fixedSalary: 0,
                status: 'active',
                bhxh: false,
                kpiDefault: 85
            };
            
            this.employees.push(newEmp);
            
            // Add leave balance
            this.leaveBalances.push({
                employeeId: newId,
                initial: 12,
                added: 0,
                used: 0,
                balance: 12
            });
            
            this.saveToLocalStorage();
            alert('✅ Đã thêm nhân viên mới. Vui lòng chỉnh sửa thông tin.');
        },
        
        editEmployee(emp) {
            const name = prompt('Họ và tên:', emp.name);
            if (name !== null && name.trim()) {
                emp.name = name.trim();
                this.saveToLocalStorage();
            }
        },
        
        deleteEmployee(id) {
            if (confirm('⚠️ Xác nhận xóa nhân viên này?')) {
                this.employees = this.employees.filter(e => e.id !== id);
                this.leaveBalances = this.leaveBalances.filter(l => l.employeeId !== id);
                this.saveToLocalStorage();
            }
        },
        
        addClass() {
            const newId = Math.max(...this.classes.map(c => c.id), 0) + 1;
            const newClass = {
                id: newId,
                code: `CLASS${newId}`,
                name: 'Lớp mới',
                type: 'Chính',
                teacherId: null,
                price: this.settings.defaultKemPrice
            };
            
            this.classes.push(newClass);
            this.saveToLocalStorage();
            alert('✅ Đã thêm lớp mới. Vui lòng chỉnh sửa thông tin.');
        },
        
        editClass(cls) {
            const name = prompt('Tên lớp:', cls.name);
            if (name !== null && name.trim()) {
                cls.name = name.trim();
                this.saveToLocalStorage();
            }
        },
        
        deleteClass(id) {
            if (confirm('⚠️ Xác nhận xóa lớp này?')) {
                this.classes = this.classes.filter(c => c.id !== id);
                this.saveToLocalStorage();
            }
        },
        
        createPayrollMonth() {
            const month = prompt('Nhập tháng (YYYY-MM):', this.currentMonth);
            if (!month || !/^\d{4}-\d{2}$/.test(month)) {
                alert('❌ Định dạng tháng không hợp lệ!');
                return;
            }
            
            const existing = this.payrollMonths.find(m => m.id === month);
            if (existing) {
                alert('❌ Kỳ lương này đã tồn tại!');
                return;
            }
            
            const newMonth = {
                id: month,
                name: `Tháng ${month}`,
                status: 'Đang nhập',
                created: new Date().toISOString(),
                payrollData: {},
                result: null,
                summary: null
            };
            
            this.payrollMonths.push(newMonth);
            this.saveToLocalStorage();
            this.selectedPayrollMonth = newMonth;
            alert(`✅ Đã tạo kỳ lương ${month}`);
        },
        
        openPayrollMonth(month) {
            this.selectedPayrollMonth = month;
        },
        
        getPayrollInput(employeeId) {
            if (!this.selectedPayrollMonth) return {};
            
            if (!this.selectedPayrollMonth.payrollData[employeeId]) {
                this.selectedPayrollMonth.payrollData[employeeId] = {
                    regularClasses: 0,
                    sessions: 0,
                    kemSessions: 0,
                    kpiScore: null,
                    adjustments: 0,
                    note: ''
                };
            }
            
            return this.selectedPayrollMonth.payrollData[employeeId];
        },
        
        calculatePayroll() {
            if (!this.selectedPayrollMonth) {
                alert('❌ Chưa chọn kỳ lương!');
                return;
            }
            
            // Prepare payroll data
            const payrollData = {};
            
            this.employees.forEach(emp => {
                const input = this.selectedPayrollMonth.payrollData[emp.id] || {};
                
                // Only part-time teachers use approved sessions.
                if (emp.position === 'GV' && emp.type === 'Part-time') {
                    input.sessions = input.regularClasses || 0;
                }
                
                // Build kem classes array for Full-time teachers
                if (emp.type === 'Full-time' && emp.position === 'GV') {
                    const kemSessions = input.kemSessions || 0;
                    input.kemClasses = kemSessions > 0 ? [{
                        sessions: kemSessions,
                        total: kemSessions * this.settings.defaultKemPrice
                    }] : [];
                }
                
                payrollData[emp.id] = input;
            });
            
            // Calculate using PayrollEngine
            const result = PayrollEngine.generateMonthPayroll(
                this.employees,
                payrollData,
                this.settings,
                this.selectedPayrollMonth.id
            );
            
            this.selectedPayrollMonth.result = result;
            this.selectedPayrollMonth.summary = result.summary;
            this.selectedPayrollMonth.status = 'Đã tính';
            
            this.saveToLocalStorage();
            alert('✅ Đã tính lương xong!');
        },
        
        exportPayrollExcel() {
            if (!this.selectedPayrollMonth?.result) {
                alert('❌ Chưa có kết quả tính lương!');
                return;
            }
            
            alert('🚧 Chức năng xuất Excel đang phát triển.');
        },
        
        adjustLeave(leave) {
            const used = prompt(`Phép đã dùng cho ${this.getEmployeeName(leave.employeeId)}:`, leave.used);
            if (used !== null) {
                leave.used = parseInt(used) || 0;
                leave.balance = leave.initial + leave.added - leave.used;
                this.saveToLocalStorage();
            }
        },
        
        // Settings
        saveSettings() {
            this.calculateBHXH();
            this.saveToLocalStorage();
            alert('✅ Đã lưu cài đặt!');
        },
        
        // Backup & Restore
        downloadBackup() {
            const data = {
                version: this.settings.version,
                timestamp: new Date().toISOString(),
                employees: this.employees,
                classes: this.classes,
                payrollMonths: this.payrollMonths,
                bhxhParticipants: this.bhxhParticipants,
                leaveBalances: this.leaveBalances,
                settings: this.settings
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `bang_luong_backup_${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            alert('✅ Đã tải xuống file backup!');
        },
        
        uploadBackup(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    // Validate
                    if (!data.version || !data.employees || !data.settings) {
                        throw new Error('File backup không hợp lệ!');
                    }
                    
                    if (!confirm('⚠️ Xác nhận khôi phục dữ liệu? Dữ liệu hiện tại sẽ bị thay thế!')) {
                        return;
                    }
                    
                    // Restore
                    this.employees = data.employees;
                    this.classes = data.classes;
                    this.payrollMonths = data.payrollMonths || [];
                    this.bhxhParticipants = data.bhxhParticipants || [];
                    this.leaveBalances = data.leaveBalances || [];
                    this.settings = { ...this.settings, ...data.settings };
                    
                    this.saveToLocalStorage();
                    this.showBackup = false;
                    
                    alert('✅ Đã khôi phục dữ liệu thành công!');
                    location.reload();
                    
                } catch (err) {
                    alert('❌ Lỗi: ' + err.message);
                }
            };
            
            reader.readAsText(file);
        },
        
        // Copy to clipboard
        copyText(text) {
            const el = document.createElement('textarea');
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            
            // Show feedback
            const btn = event.target;
            const original = btn.textContent;
            btn.textContent = '✓ Đã sao chép';
            setTimeout(() => {
                btn.textContent = original;
            }, 1500);
        },
        
        // LocalStorage
        saveToLocalStorage() {
            const data = {
                employees: this.employees,
                classes: this.classes,
                payrollMonths: this.payrollMonths,
                bhxhParticipants: this.bhxhParticipants,
                leaveBalances: this.leaveBalances,
                settings: this.settings,
                monthlyTasks: this.monthlyTasks
            };
            
            localStorage.setItem('bangLuong', JSON.stringify(data));
        },
        
        loadFromLocalStorage() {
            const saved = localStorage.getItem('bangLuong');
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    this.employees = data.employees || [];
                    this.classes = data.classes || [];
                    this.payrollMonths = data.payrollMonths || [];
                    this.bhxhParticipants = data.bhxhParticipants || [];
                    this.leaveBalances = data.leaveBalances || [];
                    this.settings = { ...this.settings, ...(data.settings || {}) };
                    this.monthlyTasks = data.monthlyTasks || this.monthlyTasks;
                } catch (err) {
                    console.error('Error loading from localStorage:', err);
                }
            }
        }
    };
}

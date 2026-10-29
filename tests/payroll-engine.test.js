const assert = require('node:assert/strict');
const PayrollEngine = require('../payroll-engine.js');

const settings = {
  sessionsPerMonth: 8,
  fixedSalaryRatio: 70,
  bhxhEmployeeRate: 10.5,
  bhxhCompanyRate: 21.5,
  bhxhDirector: 1504500
};

function employee(overrides = {}) {
  return {
    id: 99,
    code: 'NVTEST',
    name: 'Nhân viên thử',
    position: 'GV',
    type: 'Full-time',
    level: 5,
    status: 'active',
    bhxh: false,
    ...overrides
  };
}

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    throw error;
  }
}

test('KPI follows the approved threshold boundaries', () => {
  assert.equal(PayrollEngine.getKPIMultiplier(49), 0);
  assert.equal(PayrollEngine.getKPIMultiplier(50), 0.5);
  assert.equal(PayrollEngine.getKPIMultiplier(69), 0.5);
  assert.equal(PayrollEngine.getKPIMultiplier(70), 0.75);
  assert.equal(PayrollEngine.getKPIMultiplier(84), 0.75);
  assert.equal(PayrollEngine.getKPIMultiplier(85), 1);
});

test('Full-time salary keeps 70 percent fixed pay and 30 percent KPI fund', () => {
  const result = PayrollEngine.generateEmployeePayroll(
    employee({ level: 100000 }),
    { regularClasses: 1, kpiScore: 50 }, settings, '2026-10'
  );
  assert.equal(result.salaryDetail.totalRegularSalary, 800000);
  assert.equal(result.salaryDetail.fixedSalary, 560000);
  assert.equal(result.salaryDetail.kpiFund, 240000);
  assert.equal(result.salaryDetail.kpiAmount, 120000);
  assert.equal(result.salaryDetail.grossSalary, 680000);
});

test('Part-time salary uses the per-session rate', () => {
  const result = PayrollEngine.generateEmployeePayroll(
    employee({ type: 'Part-time', ratePerSession: 150000 }),
    { sessions: 3 }, settings, '2026-10'
  );
  assert.equal(result.salaryDetail.grossSalary, 450000);
  assert.equal(result.salaryDetail.ratePerSession, 150000);
});

test('Monthly package salary does not depend on session count', () => {
  const result = PayrollEngine.generateEmployeePayroll(
    employee({ position: 'Content', type: 'Monthly-package', monthlyPackage: 1600000 }),
    { sessions: 99 }, settings, '2026-10'
  );
  assert.equal(result.salaryDetail.grossSalary, 1600000);
});

test('An employee without BHXH has no insurance deduction', () => {
  const result = PayrollEngine.generateEmployeePayroll(
    employee({ position: 'Content', type: 'Monthly-package', monthlyPackage: 1600000, bhxh: false }),
    {}, settings, '2026-10'
  );
  assert.equal(result.bhxh.employeeContribution, 0);
  assert.equal(result.netSalary, 1600000);
});

test('BHXH-only begins from its configured payroll month', () => {
  const hongAnh = employee({
    id: 4,
    position: 'GV',
    bhxh: true,
    bhxhBase: 5100000,
    bhxhOnlyFrom: '2026-11'
  });
  const october = PayrollEngine.generateEmployeePayroll(hongAnh, { regularClasses: 1, kpiScore: 85 }, settings, '2026-10');
  const november = PayrollEngine.generateEmployeePayroll(hongAnh, { regularClasses: 1, kpiScore: 85 }, settings, '2026-11');
  assert.equal(october.salaryDetail.type, 'full-time');
  assert.equal(november.salaryDetail.type, 'bhxh-only');
  assert.equal(november.salaryDetail.grossSalary, 0);
});

test('Legacy fixedSalary remains compatible during migration', () => {
  const partTime = PayrollEngine.normalizeEmployee(employee({ type: 'Part-time', fixedSalary: 120000 }));
  const content = PayrollEngine.normalizeEmployee(employee({ position: 'Content', type: 'Part-time', fixedSalary: 1600000 }));
  const office = PayrollEngine.normalizeEmployee(employee({ position: 'HCNS', type: 'Full-time', fixedSalary: 9200000 }));
  assert.equal(partTime.ratePerSession, 120000);
  assert.equal(content.monthlyPackage, 1600000);
  assert.equal(office.monthlyPackage, 9200000);
});

console.log('All payroll engine tests passed.');

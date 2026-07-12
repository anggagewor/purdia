import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // Dashboard
  {
    path: '/crm',
    name: 'crm-dashboard',
    component: () => import('@/pages/crm/CrmDashboard.vue'),
  },
  // Customers
  {
    path: '/crm/customers',
    name: 'crm-customers',
    component: () => import('@/pages/crm/CustomerList.vue'),
  },
  // Pipeline
  {
    path: '/crm/pipeline',
    name: 'crm-pipeline',
    component: () => import('@/pages/crm/CrmPipeline.vue'),
  },
  // Leads
  {
    path: '/crm/leads',
    name: 'crm-leads',
    component: () => import('@/pages/crm/leads/LeadList.vue'),
  },
  {
    path: '/crm/leads/create',
    name: 'crm-lead-create',
    component: () => import('@/pages/crm/leads/LeadCreate.vue'),
  },
  {
    path: '/crm/leads/:id',
    name: 'crm-lead-detail',
    component: () => import('@/pages/crm/leads/LeadDetail.vue'),
  },
  {
    path: '/crm/leads/:id/edit',
    name: 'crm-lead-edit',
    component: () => import('@/pages/crm/leads/LeadEdit.vue'),
  },
  // Companies
  {
    path: '/crm/companies',
    name: 'crm-companies',
    component: () => import('@/pages/crm/companies/CompanyList.vue'),
  },
  {
    path: '/crm/companies/create',
    name: 'crm-company-create',
    component: () => import('@/pages/crm/companies/CompanyCreate.vue'),
  },
  {
    path: '/crm/companies/:id',
    name: 'crm-company-detail',
    component: () => import('@/pages/crm/companies/CompanyDetail.vue'),
  },
  {
    path: '/crm/companies/:id/edit',
    name: 'crm-company-edit',
    component: () => import('@/pages/crm/companies/CompanyEdit.vue'),
  },
  // Contacts
  {
    path: '/crm/contacts',
    name: 'crm-contacts',
    component: () => import('@/pages/crm/contacts/ContactList.vue'),
  },
  {
    path: '/crm/contacts/create',
    name: 'crm-contact-create',
    component: () => import('@/pages/crm/contacts/ContactCreate.vue'),
  },
  {
    path: '/crm/contacts/:id',
    name: 'crm-contact-detail',
    component: () => import('@/pages/crm/contacts/ContactDetail.vue'),
  },
  {
    path: '/crm/contacts/:id/edit',
    name: 'crm-contact-edit',
    component: () => import('@/pages/crm/contacts/ContactEdit.vue'),
  },
  // Deals
  {
    path: '/crm/deals',
    name: 'crm-deals',
    component: () => import('@/pages/crm/deals/DealList.vue'),
  },
  {
    path: '/crm/deals/create',
    name: 'crm-deal-create',
    component: () => import('@/pages/crm/deals/DealCreate.vue'),
  },
  {
    path: '/crm/deals/:id',
    name: 'crm-deal-detail',
    component: () => import('@/pages/crm/deals/DealDetail.vue'),
  },
  {
    path: '/crm/deals/:id/edit',
    name: 'crm-deal-edit',
    component: () => import('@/pages/crm/deals/DealEdit.vue'),
  },
  // Activities
  {
    path: '/crm/activities',
    name: 'crm-activities',
    component: () => import('@/pages/crm/activities/ActivityList.vue'),
  },
  {
    path: '/crm/activities/create',
    name: 'crm-activity-create',
    component: () => import('@/pages/crm/activities/ActivityCreate.vue'),
  },
  {
    path: '/crm/activities/:id/edit',
    name: 'crm-activity-edit',
    component: () => import('@/pages/crm/activities/ActivityEdit.vue'),
  },
  // Follow Ups
  {
    path: '/crm/follow-ups',
    name: 'crm-follow-ups',
    component: () => import('@/pages/crm/follow-ups/FollowUpList.vue'),
  },
  {
    path: '/crm/follow-ups/create',
    name: 'crm-follow-up-create',
    component: () => import('@/pages/crm/follow-ups/FollowUpCreate.vue'),
  },
  {
    path: '/crm/follow-ups/:id/edit',
    name: 'crm-follow-up-edit',
    component: () => import('@/pages/crm/follow-ups/FollowUpEdit.vue'),
  },
  // Tasks
  {
    path: '/crm/tasks',
    name: 'crm-tasks',
    component: () => import('@/pages/crm/tasks/TaskList.vue'),
  },
  {
    path: '/crm/tasks/create',
    name: 'crm-task-create',
    component: () => import('@/pages/crm/tasks/TaskCreate.vue'),
  },
  {
    path: '/crm/tasks/:id/edit',
    name: 'crm-task-edit',
    component: () => import('@/pages/crm/tasks/TaskEdit.vue'),
  },
  // Quotations
  {
    path: '/crm/quotations',
    name: 'crm-quotations',
    component: () => import('@/pages/crm/quotations/QuotationList.vue'),
  },
  {
    path: '/crm/quotations/create',
    name: 'crm-quotation-create',
    component: () => import('@/pages/crm/quotations/QuotationCreate.vue'),
  },
  {
    path: '/crm/quotations/:id',
    name: 'crm-quotation-detail',
    component: () => import('@/pages/crm/quotations/QuotationDetail.vue'),
  },
  {
    path: '/crm/quotations/:id/edit',
    name: 'crm-quotation-edit',
    component: () => import('@/pages/crm/quotations/QuotationEdit.vue'),
  },
  // Calendar
  {
    path: '/crm/calendar',
    name: 'crm-calendar',
    component: () => import('@/pages/crm/CrmCalendar.vue'),
  },
  // Reports
  {
    path: '/crm/reports',
    name: 'crm-reports',
    component: () => import('@/pages/crm/CrmReports.vue'),
  },
]

export default routes

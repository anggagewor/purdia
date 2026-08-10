import { createRouter, createWebHistory } from 'vue-router'
import { createAuthGuard } from '@purdia/auth'

import authRoutes from './routes/auth'
import dashboardRoutes from './routes/dashboard'
import examplesRoutes from './routes/examples'
import accountRoutes from './routes/account'
import usersRoutes from './routes/users'
import clientsRoutes from './routes/clients'
import projectsRoutes from './routes/projects'
import posRoutes from './routes/pos'
import accountingRoutes from './routes/accounting'
import invoicesRoutes from './routes/invoices'
import crmRoutes from './routes/crm'
import hrmRoutes from './routes/hrm'
import inventoryRoutes from './routes/inventory'
import publicRoutes from './routes/public'
import chatRoutes from './routes/chat'
import emailRoutes from './routes/email'
import pagesRoutes from './routes/pages'
import errorRoutes from './routes/errors'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...publicRoutes,
    ...dashboardRoutes,
    ...examplesRoutes,
    ...accountRoutes,
    ...usersRoutes,
    ...clientsRoutes,
    ...projectsRoutes,
    ...posRoutes,
    ...accountingRoutes,
    ...invoicesRoutes,
    ...crmRoutes,
    ...hrmRoutes,
    ...inventoryRoutes,
    ...chatRoutes,
    ...emailRoutes,
    ...pagesRoutes,
    ...errorRoutes,
  ],
})

createAuthGuard(router, {
  loginRoute: 'login',
  homeRoute: 'dashboard',
})

export default router

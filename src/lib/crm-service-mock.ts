import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import 'server-only';

// --- Types ---

export interface Company {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    status: 'active' | 'lead' | 'churned';
    tags: string[];
    address?: string;
    aggregated_revenue: number; // Denormalized field
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
}

export interface Contact {
    id: string;
    companyId: string;
    name: string;
    email: string;
    phone?: string;
    role?: string; // e.g., "CEO", "Marketing Manager"
    createdAt: string;
}

export type TimelineEventType = 'note_added' | 'email_sent' | 'project_state_changed' | 'invoice_paid';

export interface TimelineEvent {
    id: string;
    companyId: string;
    type: TimelineEventType;
    content: string; // Markdown or plain text description
    metadata?: Record<string, any>; // Extra data like invoiceId, projectId
    createdAt: string;
    createdBy: string; // User ID or Name
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
export type TransactionType = 'deposit' | 'withdrawal';

export interface Invoice {
    id: string;
    companyId: string;
    date: string; // ISO string
    type: TransactionType;
    description: string;
    status: InvoiceStatus;
    amount: number; // Positive for deposits, negative for withdrawals
    metadata?: Record<string, any>; // Extra data like card number, reference, etc.
    createdAt: string;
    updatedAt: string;
}

// --- Storage ---
const DB_PATH = path.join(process.cwd(), 'mock-crm-db.json');

interface DB {
    companies: Company[];
    contacts: Contact[];
    events: TimelineEvent[];
    invoices: Invoice[];
}

const initialDB: DB = {
    companies: [],
    contacts: [],
    events: [],
    invoices: [],
};

const getDB = async (): Promise<DB> => {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return initial DB
        return initialDB;
    }
};

const saveDB = async (db: DB) => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
};

const delay = () => new Promise(resolve => setTimeout(resolve, 200));

// --- Company Actions ---

export const getCompanies = async (): Promise<Company[]> => {
    await delay();
    const db = await getDB();
    return db.companies;
};

export const getCompanyById = async (id: string): Promise<Company | undefined> => {
    await delay();
    const db = await getDB();
    return db.companies.find(c => c.id === id);
};

export const createCompany = async (data: Omit<Company, 'id' | 'createdAt' | 'updatedAt' | 'aggregated_revenue'>): Promise<Company> => {
    await delay();
    const db = await getDB();

    const newCompany: Company = {
        ...data,
        id: uuidv4(),
        aggregated_revenue: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    db.companies.unshift(newCompany);
    await saveDB(db);
    return newCompany;
};

export const updateCompany = async (id: string, updates: Partial<Company>): Promise<Company> => {
    await delay();
    const db = await getDB();
    const index = db.companies.findIndex(c => c.id === id);

    if (index === -1) throw new Error('Company not found');

    const updatedCompany = {
        ...db.companies[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };

    db.companies[index] = updatedCompany;
    await saveDB(db);
    return updatedCompany;
};

// --- Contact Actions ---

export const getContacts = async (companyId: string): Promise<Contact[]> => {
    await delay();
    const db = await getDB();
    return db.contacts.filter(c => c.companyId === companyId);
};

export const createContact = async (data: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> => {
    await delay();
    const db = await getDB();

    const newContact: Contact = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
    };

    db.contacts.push(newContact);
    await saveDB(db);
    return newContact;
};

// --- Timeline Actions ---

export const getTimelineEvents = async (companyId: string): Promise<TimelineEvent[]> => {
    await delay();
    const db = await getDB();
    return db.events
        .filter(e => e.companyId === companyId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const addTimelineEvent = async (data: Omit<TimelineEvent, 'id' | 'createdAt'>): Promise<TimelineEvent> => {
    await delay();
    const db = await getDB();

    const newEvent: TimelineEvent = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
    };

    db.events.unshift(newEvent);
    await saveDB(db);
    return newEvent;
};

// --- Invoice Actions ---

export const getInvoices = async (companyId: string): Promise<Invoice[]> => {
    await delay();
    const db = await getDB();
    return db.invoices
        .filter(i => i.companyId === companyId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const createInvoice = async (data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Promise<Invoice> => {
    await delay();
    const db = await getDB();

    const newInvoice: Invoice = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    db.invoices.unshift(newInvoice);
    await saveDB(db);
    return newInvoice;
};

export const updateInvoice = async (id: string, updates: Partial<Invoice>): Promise<Invoice> => {
    await delay();
    const db = await getDB();
    const index = db.invoices.findIndex(i => i.id === id);

    if (index === -1) throw new Error('Invoice not found');

    const updatedInvoice = {
        ...db.invoices[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };

    db.invoices[index] = updatedInvoice;
    await saveDB(db);
    return updatedInvoice;
};

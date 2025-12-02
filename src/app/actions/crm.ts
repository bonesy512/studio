'use server'

import { revalidatePath } from "next/cache";
import { createCompany, updateCompany, Company } from "@/lib/crm-service-mock";

export async function createCompanyAction(data: Omit<Company, 'id' | 'createdAt' | 'updatedAt' | 'aggregated_revenue'>) {
    await createCompany(data);
    revalidatePath('/dashboard/crm');
}

export async function updateCompanyAction(id: string, data: Partial<Company>) {
    await updateCompany(id, data);
    revalidatePath('/dashboard/crm');
    revalidatePath(`/dashboard/crm/${id}`);
}

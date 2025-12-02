import { getCompanies } from "@/lib/crm-service-mock";
import { CompaniesClientPage } from "./companies-client-page";

export default async function CompaniesPage() {
    const companies = await getCompanies();

    return <CompaniesClientPage initialCompanies={companies} />;
}

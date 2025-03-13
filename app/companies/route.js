import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const filePath = path.join(process.cwd(), 'data', 'remote_companies.json');

    console.log("📂 Lendo arquivo JSON em:", filePath);

    try {
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        console.log("📄 Conteúdo do JSON:", fileContents); 

        const companies = JSON.parse(fileContents);

        const name = searchParams.get('name');
        const region = searchParams.get('region');

        let filteredCompanies = companies;

        if (name) {
            filteredCompanies = filteredCompanies.filter(company =>
                company.Name.toLowerCase().includes(name.toLowerCase()) // Ajuste aqui
            );
        }

        if (region) {
            filteredCompanies = filteredCompanies.filter(company =>
                company.Region.toLowerCase().includes(region.toLowerCase()) // Ajuste aqui
            );
        }

        console.log("📊 Empresas encontradas:", filteredCompanies);
        return NextResponse.json(filteredCompanies);
    } catch (error) {
        console.error("❌ Erro ao ler o JSON:", error);
        return NextResponse.json({ error: "Erro ao ler os dados" }, { status: 500 });
    }
}

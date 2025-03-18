export interface Equipment {
    id: string;
    name: string;
}

export interface Employee {
    id: string;
    name: string;
    email: string;
    department: string;
    equipments: any[];
    status: string;
    receiver?: string;
    phone?: string;
    streetLine1?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    notes?: string;
}

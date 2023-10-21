// Não deve usar o mesmo DTO. 
// Apesar de nesse momento eles serem iguais eles podem mudar por razões diferentes. Logo são Dto diferentes
export interface InputUpdateCustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    };
}

export interface OutputUpdateCustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    };
}

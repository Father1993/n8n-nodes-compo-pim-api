import { ICredentialType, NodePropertyTypes } from 'n8n-workflow'

export class CompoPimApi implements ICredentialType {
    name = 'compoPimApi'
    displayName = 'Compo PIM API'
    properties = [
        {
            displayName: 'Login',
            name: 'login',
            type: 'string' as NodePropertyTypes,
            default: '',
        },
        {
            displayName: 'Password',
            name: 'password',
            type: 'string' as NodePropertyTypes,
            typeOptions: { password: true },
            default: '',
        },
    ]
}

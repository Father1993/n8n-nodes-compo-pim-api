import { IExecuteFunctions } from 'n8n-core'
import {
    INodeType,
    INodeTypeDescription,
    INodeExecutionData,
} from 'n8n-workflow'
import axios from 'axios'

export class CompoPimApi implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Compo PIM API',
        name: 'compoPimApi',
        group: ['transform'],
        version: 1,
        description: 'Interact with Compo PIM API',
        defaults: {
            name: 'Compo PIM',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'compoPimApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    {
                        name: 'Catalog',
                        value: 'catalog',
                    },
                    {
                        name: 'Product',
                        value: 'product',
                    },
                ],
                default: 'catalog',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                options: [
                    {
                        name: 'Get All',
                        value: 'getAll',
                    },
                    {
                        name: 'Get by ID',
                        value: 'getById',
                    },
                ],
                default: 'getAll',
            },
            {
                displayName: 'ID',
                name: 'id',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        operation: ['getById'],
                    },
                },
            },
        ],
    }

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData()
        const returnData = []

        // получаем креды
        const credentials = await this.getCredentials('compoPimApi')
        const tokenResponse = await axios.post(
            'https://demodata.compo-soft.ru/api/v1/sign-in/',
            {
                login: credentials.login,
                password: credentials.password,
                remember: true,
            }
        )

        const token = tokenResponse.data.data.access.token

        for (let i = 0; i < items.length; i++) {
            const resource = this.getNodeParameter('resource', i) as string
            const operation = this.getNodeParameter('operation', i) as string
            const id = this.getNodeParameter('id', i) as string

            let responseData

            if (resource === 'catalog') {
                if (operation === 'getAll') {
                    responseData = (
                        await axios.get(
                            'https://demodata.compo-soft.ru/api/v1/catalog',
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        )
                    ).data
                } else if (operation === 'getById') {
                    responseData = (
                        await axios.get(
                            `https://demodata.compo-soft.ru/api/v1/catalog/${id}`,
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        )
                    ).data
                }
            }

            if (resource === 'product') {
                if (operation === 'getById') {
                    responseData = (
                        await axios.get(
                            `https://demodata.compo-soft.ru/api/v1/product/${id}`,
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        )
                    ).data
                }
            }

            returnData.push({ json: responseData })
        }

        return [returnData]
    }
}

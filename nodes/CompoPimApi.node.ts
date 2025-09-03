import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeConnectionType,
    NodePropertyTypes,
} from 'n8n-workflow'
import axios from 'axios'

interface CompoPimCredentials {
    login: string;
    password: string;
}

export class CompoPimApi implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Compo PIM API',
        name: 'compoPimApi',
        icon: 'file:compopim.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Взаимодействие с Compo PIM API для управления каталогом и товарами',
        defaults: {
            name: 'Compo PIM',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'compoPimApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Ресурс',
                name: 'resource',
                type: 'options' as NodePropertyTypes,
                options: [
                    {
                        name: 'Каталог',
                        value: 'catalog',
                    },
                    {
                        name: 'Товар',
                        value: 'product',
                    },
                    {
                        name: 'Шаблон',
                        value: 'template',
                    },
                    {
                        name: 'Канал',
                        value: 'channel',
                    },
                    {
                        name: 'Характеристика',
                        value: 'feature',
                    },
                ],
                default: 'catalog',
                description: 'Выберите ресурс для работы',
            },
            // Операции для каталога
            {
                displayName: 'Операция',
                name: 'operation',
                type: 'options' as NodePropertyTypes,
                displayOptions: {
                    show: {
                        resource: ['catalog'],
                    },
                },
                options: [
                    {
                        name: 'Получить все',
                        value: 'getAll',
                        description: 'Получить все категории каталога',
                    },
                    {
                        name: 'Получить по ID',
                        value: 'getById',
                        description: 'Получить категорию по ID',
                    },
                    {
                        name: 'Создать',
                        value: 'create',
                        description: 'Создать новую категорию',
                    },
                    {
                        name: 'Обновить',
                        value: 'update',
                        description: 'Обновить категорию',
                    },
                    {
                        name: 'Удалить',
                        value: 'delete',
                        description: 'Удалить категорию',
                    },
                ],
                default: 'getAll',
            },
            // Операции для товаров
            {
                displayName: 'Операция',
                name: 'operation',
                type: 'options' as NodePropertyTypes,
                displayOptions: {
                    show: {
                        resource: ['product'],
                    },
                },
                options: [
                    {
                        name: 'Получить по ID',
                        value: 'getById',
                        description: 'Получить товар по ID',
                    },
                    {
                        name: 'Создать',
                        value: 'create',
                        description: 'Создать новый товар',
                    },
                    {
                        name: 'Обновить',
                        value: 'update',
                        description: 'Обновить товар',
                    },
                    {
                        name: 'Удалить',
                        value: 'delete',
                        description: 'Удалить товар',
                    },
                    {
                        name: 'Получить список (прокрутка)',
                        value: 'scroll',
                        description: 'Получить список товаров с прокруткой',
                    },
                ],
                default: 'getById',
            },
            // Операции для шаблонов
            {
                displayName: 'Операция',
                name: 'operation',
                type: 'options' as NodePropertyTypes,
                displayOptions: {
                    show: {
                        resource: ['template'],
                    },
                },
                options: [
                    {
                        name: 'Получить по ID',
                        value: 'getById',
                        description: 'Получить шаблон по ID',
                    },
                    {
                        name: 'Создать',
                        value: 'create',
                        description: 'Создать новый шаблон',
                    },
                    {
                        name: 'Обновить',
                        value: 'update',
                        description: 'Обновить шаблон',
                    },
                    {
                        name: 'Удалить',
                        value: 'delete',
                        description: 'Удалить шаблон',
                    },
                ],
                default: 'getById',
            },
            // Операции для каналов
            {
                displayName: 'Операция',
                name: 'operation',
                type: 'options' as NodePropertyTypes,
                displayOptions: {
                    show: {
                        resource: ['channel'],
                    },
                },
                options: [
                    {
                        name: 'Получить все',
                        value: 'getAll',
                        description: 'Получить список каналов',
                    },
                    {
                        name: 'Получить по ID',
                        value: 'getById',
                        description: 'Получить канал по ID',
                    },
                    {
                        name: 'Создать',
                        value: 'create',
                        description: 'Создать новый канал',
                    },
                    {
                        name: 'Обновить',
                        value: 'update',
                        description: 'Обновить канал',
                    },
                    {
                        name: 'Удалить',
                        value: 'delete',
                        description: 'Удалить канал',
                    },
                ],
                default: 'getAll',
            },
            // Операции для характеристик
            {
                displayName: 'Операция',
                name: 'operation',
                type: 'options' as NodePropertyTypes,
                displayOptions: {
                    show: {
                        resource: ['feature'],
                    },
                },
                options: [
                    {
                        name: 'Получить все',
                        value: 'getAll',
                        description: 'Получить все характеристики',
                    },
                    {
                        name: 'Получить по ID',
                        value: 'getById',
                        description: 'Получить характеристику по ID',
                    },
                    {
                        name: 'Создать',
                        value: 'create',
                        description: 'Создать новую характеристику',
                    },
                    {
                        name: 'Обновить',
                        value: 'update',
                        description: 'Обновить характеристику',
                    },
                    {
                        name: 'Удалить',
                        value: 'delete',
                        description: 'Удалить характеристику',
                    },
                ],
                default: 'getAll',
            },
            // ID поле
            {
                displayName: 'ID',
                name: 'id',
                type: 'string' as NodePropertyTypes,
                default: '',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['getById', 'update', 'delete'],
                    },
                },
                description: 'ID элемента для операции',
            },
            // Данные для создания/обновления
            {
                displayName: 'Данные',
                name: 'data',
                type: 'json' as NodePropertyTypes,
                default: '{}',
                displayOptions: {
                    show: {
                        operation: ['create', 'update'],
                    },
                },
                description: 'JSON данные для создания или обновления',
            },
            // Дополнительные параметры для товаров
            {
                displayName: 'ID каталога',
                name: 'catalogId',
                type: 'string' as NodePropertyTypes,
                default: '',
                displayOptions: {
                    show: {
                        resource: ['product'],
                        operation: ['scroll'],
                    },
                },
                description: 'ID каталога для фильтрации товаров',
            },
            {
                displayName: 'ID бренда',
                name: 'manufacturerId',
                type: 'string' as NodePropertyTypes,
                default: '',
                displayOptions: {
                    show: {
                        resource: ['product'],
                        operation: ['scroll'],
                    },
                },
                description: 'ID бренда для фильтрации товаров',
            },
            {
                displayName: 'Дни',
                name: 'days',
                type: 'number' as NodePropertyTypes,
                default: 1,
                displayOptions: {
                    show: {
                        resource: ['product'],
                        operation: ['scroll'],
                    },
                },
                description: 'Получить товары, измененные за указанное количество дней',
            },
            {
                displayName: 'Scroll ID',
                name: 'scrollId',
                type: 'string' as NodePropertyTypes,
                default: '',
                displayOptions: {
                    show: {
                        resource: ['product'],
                        operation: ['scroll'],
                    },
                },
                description: 'ID для продолжения прокрутки (оставьте пустым для первого запроса)',
            },
        ],
    }

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData()
        const returnData = []

        // Получаем учетные данные
        const credentials = await this.getCredentials('compoPimApi') as CompoPimCredentials
        const tokenResponse = await axios.post(
            'https://demodata.compo-soft.ru/api/v1/sign-in/',
            {
                login: credentials.login,
                password: credentials.password,
                remember: true,
            }
        )

        const token = tokenResponse.data.data.access.token
        const baseURL = 'https://demodata.compo-soft.ru/api/v1'
        const headers = { Authorization: `Bearer ${token}` }

        for (let i = 0; i < items.length; i++) {
            const resource = this.getNodeParameter('resource', i) as string
            const operation = this.getNodeParameter('operation', i) as string
            
            let responseData

            try {
                if (resource === 'catalog') {
                    switch (operation) {
                        case 'getAll':
                            responseData = (await axios.get(`${baseURL}/catalog`, { headers })).data
                            break
                        case 'getById':
                            const catalogId = this.getNodeParameter('id', i) as string
                            responseData = (await axios.get(`${baseURL}/catalog/${catalogId}`, { headers })).data
                            break
                        case 'create':
                            const catalogCreateData = this.getNodeParameter('data', i) as object
                            responseData = (await axios.post(`${baseURL}/catalog/rapid`, catalogCreateData, { headers })).data
                            break
                        case 'update':
                            const catalogUpdateId = this.getNodeParameter('id', i) as string
                            const catalogUpdateData = this.getNodeParameter('data', i) as object
                            responseData = (await axios.post(`${baseURL}/catalog/rapid/${catalogUpdateId}`, catalogUpdateData, { headers })).data
                            break
                        case 'delete':
                            const catalogDeleteId = this.getNodeParameter('id', i) as string
                            responseData = (await axios.delete(`${baseURL}/catalog/${catalogDeleteId}`, { headers })).data
                            break
                        default:
                            throw new Error(`Неподдерживаемая операция для каталога: ${operation}`)
                    }
                } else if (resource === 'product') {
                    switch (operation) {
                        case 'getById':
                            const productId = this.getNodeParameter('id', i) as string
                            responseData = (await axios.get(`${baseURL}/product/${productId}`, { headers })).data
                            break
                        case 'create':
                            const productCreateData = this.getNodeParameter('data', i) as object
                            responseData = (await axios.post(`${baseURL}/product`, productCreateData, { headers })).data
                            break
                        case 'update':
                            const productUpdateId = this.getNodeParameter('id', i) as string
                            const productUpdateData = this.getNodeParameter('data', i) as object
                            responseData = (await axios.post(`${baseURL}/product/${productUpdateId}`, productUpdateData, { headers })).data
                            break
                        case 'delete':
                            const productDeleteId = this.getNodeParameter('id', i) as string
                            responseData = (await axios.delete(`${baseURL}/product/${productDeleteId}`, { headers })).data
                            break
                        case 'scroll':
                            const scrollId = this.getNodeParameter('scrollId', i, '') as string
                            const catalogIdFilter = this.getNodeParameter('catalogId', i, '') as string
                            const manufacturerId = this.getNodeParameter('manufacturerId', i, '') as string
                            const days = this.getNodeParameter('days', i, 1) as number
                            
                            let scrollUrl = `${baseURL}/product/scroll`
                            const params = new URLSearchParams()
                            
                            if (scrollId) params.append('scrollId', scrollId)
                            if (catalogIdFilter) params.append('catalogId', catalogIdFilter)
                            if (manufacturerId) params.append('manufacturerId', manufacturerId)
                            if (days > 0) params.append('day', days.toString())
                            
                            if (params.toString()) scrollUrl += `?${params.toString()}`
                            responseData = (await axios.get(scrollUrl, { headers })).data
                            break
                        default:
                            throw new Error(`Неподдерживаемая операция для товара: ${operation}`)
                    }
                } else if (resource === 'template') {
                    switch (operation) {
                        case 'getById':
                            const templateId = this.getNodeParameter('id', i) as string
                            responseData = (await axios.get(`${baseURL}/template/${templateId}`, { headers })).data
                            break
                        case 'create':
                            const templateCreateData = this.getNodeParameter('data', i) as object
                            responseData = (await axios.post(`${baseURL}/template`, templateCreateData, { headers })).data
                            break
                        case 'update':
                            const templateUpdateId = this.getNodeParameter('id', i) as string
                            const templateUpdateData = this.getNodeParameter('data', i) as object
                            responseData = (await axios.post(`${baseURL}/template/${templateUpdateId}`, templateUpdateData, { headers })).data
                            break
                        case 'delete':
                            const templateDeleteId = this.getNodeParameter('id', i) as string
                            responseData = (await axios.delete(`${baseURL}/template/${templateDeleteId}`, { headers })).data
                            break
                        default:
                            throw new Error(`Неподдерживаемая операция для шаблона: ${operation}`)
                    }
                } else if (resource === 'channel') {
                    switch (operation) {
                        case 'getAll':
                            responseData = (await axios.get(`${baseURL}/catalog/channels-list`, { headers })).data
                            break
                        case 'getById':
                            const channelId = this.getNodeParameter('id', i) as string
                            responseData = (await axios.get(`${baseURL}/channel/${channelId}`, { headers })).data
                            break
                        case 'create':
                            const channelCreateData = this.getNodeParameter('data', i) as object
                            responseData = (await axios.post(`${baseURL}/channel`, channelCreateData, { headers })).data
                            break
                        case 'update':
                            const channelUpdateId = this.getNodeParameter('id', i) as string
                            const channelUpdateData = this.getNodeParameter('data', i) as object
                            responseData = (await axios.post(`${baseURL}/channel/${channelUpdateId}`, channelUpdateData, { headers })).data
                            break
                        case 'delete':
                            const channelDeleteId = this.getNodeParameter('id', i) as string
                            responseData = (await axios.delete(`${baseURL}/channel/${channelDeleteId}`, { headers })).data
                            break
                        default:
                            throw new Error(`Неподдерживаемая операция для канала: ${operation}`)
                    }
                } else if (resource === 'feature') {
                    switch (operation) {
                        case 'getAll':
                            responseData = (await axios.get(`${baseURL}/feature`, { headers })).data
                            break
                        case 'getById':
                            const featureId = this.getNodeParameter('id', i) as string
                            responseData = (await axios.get(`${baseURL}/feature/${featureId}`, { headers })).data
                            break
                        case 'create':
                            const featureCreateData = this.getNodeParameter('data', i) as object
                            responseData = (await axios.post(`${baseURL}/feature`, featureCreateData, { headers })).data
                            break
                        case 'update':
                            const featureUpdateId = this.getNodeParameter('id', i) as string
                            const featureUpdateData = this.getNodeParameter('data', i) as object
                            responseData = (await axios.post(`${baseURL}/feature/${featureUpdateId}`, featureUpdateData, { headers })).data
                            break
                        case 'delete':
                            const featureDeleteId = this.getNodeParameter('id', i) as string
                            responseData = (await axios.delete(`${baseURL}/feature/${featureDeleteId}`, { headers })).data
                            break
                        default:
                            throw new Error(`Неподдерживаемая операция для характеристики: ${operation}`)
                    }
                } else {
                    throw new Error(`Неподдерживаемый ресурс: ${resource}`)
                }

                returnData.push({ json: responseData })
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error)
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: errorMessage }, pairedItem: { item: i } })
                } else {
                    throw error
                }
            }
        }

        return [returnData]
    }
}

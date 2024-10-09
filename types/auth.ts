export type SignupRequest = {
    name: string
    email: string
    password: string
    // organizationName: string
}

export type SignupResponse = {
    message: string
    organization: {
        id: string
        name: string
        createdAt: string
        updatedAt: string
    }
    user: {
        id: string
        name: string
        role: string
    }
    token: {
        value: string
        expiresAt: string
    }
}

export type CreateOrganizationRequest = {
    userName: string
    email: string
    password: string
    organizationName: string
}

export type CreateOrganizationResponse = {
    message: string
    organization: {
        id: string
        name: string
        createdAt: string
        updatedAt: string
    }
    user: {
        id: string
        name: string
        role: string
    }
    token: {
        value: string
        expiresAt: string
    }
}

export type SigninRequest = {
    email: string
    password: string
}

export type SigninResponse = {
    message: string
    organization: {
        id: string
        name: string
        createdAt: string
        updatedAt: string
    }
    user: {
        id: string
        name: string
        role: string
    }
    token: {
        value: string
        expiresAt: string
    }
}

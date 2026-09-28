export interface ProfileData {
    message: string,
    user: User
}

export interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
    gender: string
    age: number
    weight: number
    height: number
    activityLevel: string
    goal: string
    photo: string
    createdAt: string
}

export interface EditProfile {
    firstName?: string
    lastName?: string
    gender?: string
    age?: number
    weight?: number
    height?: number
    activityLevel?: string
    goal?: string
}


export interface UploadPhoto {
    photo: File
}

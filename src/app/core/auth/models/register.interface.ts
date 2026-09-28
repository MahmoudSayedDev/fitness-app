import { User } from "./profile-data.interface"

export interface RegisterReq {
    firstName: string
    lastName: string
    email: string
    password: string
    rePassword: string
    gender: string
    height: number
    weight: number
    age: number
    goal: string
    activityLevel: string
}


export interface RegisterRes {
    message: string
    user: User
    token: string
}
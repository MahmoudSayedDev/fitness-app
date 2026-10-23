export interface MealDetailsResponse {
    meals: MealDetails[] | null
}

export interface MealDetails {
    idMeal: string
    strMeal: string
    strCategory: string
    strArea: string
    strInstructions: string
    strMealThumb: string
    strTags: string | null
    strYoutube: string | null
    [key: `strIngredient${number}`]: string | null
    [key: `strMeasure${number}`]: string | null
}

export interface MealIngredient {
    name: string
    measure: string
}

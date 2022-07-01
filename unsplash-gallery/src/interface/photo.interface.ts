export interface PhotoInterface{
    urls: {
        regular: string
    },
    alt_description: string,
    likes: number,
    user: {
        name: string,
        portfolio_url: string,
        profile_image: {
            medium: string
        }
    }
}
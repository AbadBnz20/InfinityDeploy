export interface AuthResponse {
    jwt:  string;
    user: User;
}

export interface User {
    id:          number;
    documentId:  string;
    username:    string;
    email:       string;
    provider:    string;
    confirmed:   boolean;
    blocked:     boolean;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    locale:      null;
}

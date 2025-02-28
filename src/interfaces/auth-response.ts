
export interface AuthResponse {
    data: Data;
}

export interface Data {
    token: string;
    user:  User;
}

export interface User {
    firstname: string;
    lastname:  string;
    email:     string;
    password:  string;
    number:    number;
    birthdate: Date;
    id:        number;
    photo:     Photo;
    country:      Country;
    package:   Package;
    phone:     Phone;
}

export interface Package {
    id:          number;
    documentId:  string;
    name:        string;
    percentage:  number;
    price:       number;
    description: string;
    state:       boolean;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: null;
    locale:      null;
}

export interface Country {
    name: string;
}

export interface Phone {
    code: string;
}

export interface Photo {
    formats: Formats;
}

export interface Formats {
    thumbnail: Large;
    small:     Large;
    medium:    Large;
    large:     Large;
}

export interface Large {
    name:              string;
    hash:              string;
    ext:               string;
    mime:              string;
    path:              null;
    width:             number;
    height:            number;
    size:              number;
    sizeInBytes:       number;
    url:               string;
    provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
    public_id:     string;
    resource_type: string;
}

export interface UserActive{
    profileId: string,
    firstname:string,
    lastname: string,
    address: string,
    photo: string,
    state: boolean,
    user_id:string,
    stateId: string,
    packageId: string,
    languageId: string,
    roleId: string
  }

  
export interface UserCookie {
    firstname:string,
    lastname:string,
    email:string | undefined,
    phono:string 
    number: string | undefined,
   }

   export interface UserCookieSession {
    firstname:string,
    lastname:string,
    email:string | undefined,
    number:string 
   }
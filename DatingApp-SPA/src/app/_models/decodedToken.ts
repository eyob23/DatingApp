export interface DecodedToken {
  nameid: string;
  unique_name: string;
  nbf: Date;
  exp: Date;
  iat: Date;
}

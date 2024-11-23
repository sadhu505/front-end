export class AuthUser{
    constructor(
        public email:string,
        public memberId:string,
        private _token:string,
        private _expiresTokenDate:Date
    ){}

    get token(){
        if(!this._expiresTokenDate || new Date() > this._expiresTokenDate){
            return null;
        }
        return this._token
    }
}
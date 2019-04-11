class  StorageService{
    constructor(){
         
    }
    setKeyValue(key:string,val:any){
        window.localStorage.setItem(key,val)
    }
    getKey(key:string){
       return window.localStorage.getItem(key)
    }
    clearKey(key:string){
       window.localStorage.removeItem(key);
    }
}
export default new StorageService()
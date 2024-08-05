/*import { UserRoute } from "./user.route";

export const Routes =[
    {
        route: '/users',
        children:UserRoute
    }
    
        
]/

  Routes.forEach(r => {
        r.children.forEach(child => {
          (app as any)[child.method](r.route+'/'+child.parameter, (req:Request, res:Response, next: Function)=>{
            const result= (new (child.controller as any))[child.action](req, res, next)
            if (result instanceof Promise){
               result.then(result => result!== null && result !== undefined? res.send(result):undefined)
            }
            else if( result !== null && result !== undefined){
                res.json(result)
            }
          })
        })
    })
*/
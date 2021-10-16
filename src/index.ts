import "reflect-metadata";
import app from './server/app'

const PORT = 3000;

app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      console.log(r.route.path)
    }
  })
app.listen(PORT, ()=>{
    console.info('Express server is listening on 3000')
})


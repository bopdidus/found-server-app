import "reflect-metadata";
import app from './server/app'

const PORT = 3000;

app.listen(PORT, ()=>{
    console.info('Express server is listening on 3000')
})


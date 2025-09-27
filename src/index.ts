import express, { Request, Response } from 'express';
import cors from 'cors';
import UserData from './Data/userData';
import PostData from './Data/postData';
import UserBusiness from './Business/userBusiness';
import PostBusiness from './Business/postBusiness';
import UserController from './Controller/userController';
import PostController from './Controller/postController';
import createUserRoutes from './Routes/userRoutes';
import createPostRoutes from './Routes/postRoutes';

const app = express();
const port = 3000;

// Configurar CORS
app.use(cors());

// Middleware para parsing de JSON
app.use(express.json());

// Exemplo de rota
app.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo à API com TypeScript!');
});

// Inicializar Data, Business e Controller
const userData = new UserData();
const postData = new PostData();
const userBusiness = new UserBusiness(userData);
const postBusiness = new PostBusiness(postData, userData);
const userController = new UserController(userBusiness);
const postController = new PostController(postBusiness);

// Configurar rotas
app.use('/users', createUserRoutes(userController));
app.use('/posts', createPostRoutes(postController));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
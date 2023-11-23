vue3+ts引入的 其他的.js文件如three会出现红线，但是不会影响使用，如何如掉？
解决方案，我们打开env.d.ts文件，声明模块declare module 'three',即可

### 1-9为threejs基础

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

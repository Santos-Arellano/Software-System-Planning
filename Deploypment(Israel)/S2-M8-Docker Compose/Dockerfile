# Usa la imagen oficial de NGINX en su versión más reciente como base para el contenedor
FROM nginx:latest

# Copia un archivo index.html desde el sistema local al directorio del contenedor
COPY index.html /usr/share/nginx/html/

# Indica que el contenedor utilizará su puerto 80 para aceptar conexiones HTTP
EXPOSE 80

# La opción -g en NGINX significa "global directive" (directiva global)
# daemon off; indica que NGINX se ejecuta en primer plano, en lugar de ejecutarse en segundo plano (daemon)
CMD ["nginx", "-g", "daemon off;"]
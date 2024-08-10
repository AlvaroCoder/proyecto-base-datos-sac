/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects(){
        return [
            {
                source : "/dashboard",
                destination : "/dashboard/libros",
                permanent : true
            }
        ]
    },
    images : {
        domains : ["res.cloudinary.com"]
    } 
    
};

export default nextConfig;

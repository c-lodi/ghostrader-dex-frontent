import React from "react";


function Footer() {
    return (
        <>
            <footer class="flex text-center items-center fixed bottom-0 left-0 w-full py-3 px-4 md:px-8 text-xs bg-transparent justify-between">
            <div class="flex">
             
                <a target="_blank" class="flex items-center space-x-2 text-white/50 hover:text-v2-primary cursor-pointer"
                    rel="noopener noreferrer" href="">
                    
                    <span>
                    © 2023-2024 Ghostrader. All Rights Reserved.
                    </span>
                </a>

                </div>
                <div class="hidden md:flex items-center">
                    <a target="_blank" class="h-8 w-6 px-1 py-1.5 text-white/50 hover:text-v2-primary flex items-center"
                        rel="noopener noreferrer" href="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#46555f" fill="none">
                            <path d="M7 7C10.8889 5.66667 13.1111 5.66667 17 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7 17C10.5 18.3333 13.5 18.3333 17 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.85703 17.625C8.85703 18.75 6.73605 21 6.19206 21C4.55894 21 3.10868 19.1246 2.38298 17.625C1.65728 15.7496 1.83899 11.0629 4.01495 4.6875C5.60121 3.54562 7.19433 3.18 8.85716 3L10 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.143 17.625C15.143 18.75 17.2639 21 17.8079 21C19.4411 21 20.8913 19.1246 21.617 17.625C22.3427 15.7496 22.161 11.0629 19.985 4.6875C18.3988 3.54562 16.8057 3.18 15.1428 3L14 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.51009 12H7.5M16.5 12H16.4899" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                    <a target="_blank" class="!ml-3 h-6 w-6 px-1 py-1.5 text-white/50 hover:text-v2-primary flex items-center"
                        rel="noopener noreferrer" href="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#46555f" fill="none">
                            <path d="M2.50012 12C2.50012 7.52166 2.50012 5.28249 3.89136 3.89124C5.28261 2.5 7.52178 2.5 12.0001 2.5C16.4785 2.5 18.7176 2.5 20.1089 3.89124C21.5001 5.28249 21.5001 7.52166 21.5001 12C21.5001 16.4783 21.5001 18.7175 20.1089 20.1088C18.7176 21.5 16.4785 21.5 12.0001 21.5C7.52178 21.5 5.28261 21.5 3.89136 20.1088C2.50012 18.7175 2.50012 16.4783 2.50012 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.00012 17L11.1937 12.8065M17.0001 7L12.8066 11.1935M12.8066 11.1935L9.7779 7H7.00012L11.1937 12.8065M12.8066 11.1935L17.0001 17H14.2223L11.1937 12.8065" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                    <a target="_blank" class="!ml-2 h-6 w-6 px-1 py-1.5 text-white/50 hover:text-v2-primary flex items-center"
                        rel="" href="https://blog.jup.ag/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#46555f" fill="none">
                            <path d="M11.9854 15.4083L15.2268 19.0936C16.4277 20.4589 17.0282 21.1416 17.6567 20.9754C18.2852 20.8092 18.5008 19.9108 18.9318 18.1138L21.3229 8.1459C21.9868 5.37832 22.3187 3.99454 21.5808 3.312C20.843 2.62947 19.564 3.13725 17.0061 4.15282L5.13876 8.86449C3.09293 9.67674 2.07001 10.0829 2.00507 10.7808C1.99842 10.8522 1.99831 10.9241 2.00474 10.9955C2.06754 11.6937 3.08921 12.1033 5.13255 12.9223C6.05838 13.2934 6.5213 13.479 6.8532 13.8344C6.89052 13.8743 6.9264 13.9157 6.96078 13.9584C7.26658 14.3384 7.39709 14.8371 7.65808 15.8344L8.14653 17.701C8.4005 18.6715 8.52749 19.1568 8.86008 19.223C9.19267 19.2891 9.48225 18.8867 10.0614 18.0819L11.9854 15.4083ZM11.9854 15.4083L11.6676 15.0771C11.3059 14.7001 11.1251 14.5117 11.1251 14.2775C11.1251 14.0433 11.3059 13.8548 11.6676 13.4778L15.2406 9.75409" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                </div>
               

                
            </footer>

        </>
    )
}

export default Footer;
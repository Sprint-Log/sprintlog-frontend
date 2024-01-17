export const generatePageNumbers = (currentPage:number, total:number) => {

    const maxButtons = 5;
    const halfButtons = Math.ceil(maxButtons / 2);
    
    let startPage = currentPage - halfButtons;  
    startPage = Math.max(startPage, 0);
    
    let endPage = startPage + maxButtons - 1;
    endPage = Math.min(endPage, total - 1);
    
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    return pageNumbers;
    };
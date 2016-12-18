const tooltip = document.createElement('div');
Object.assign(tooltip.style, {
    position: "absolute",         
    textAlign: "center",         
    width: "60px",                
    height: "28px",               
    padding: "2px",           
    font: "12px sans- serif",      
    background: "lightsteelblue", 
    border: "0px",    
    borderRadius: "8px",         
    pointerEvents: "none",
});

document.body.appendChild(tooltip);
tooltip.style.opacity = "0";

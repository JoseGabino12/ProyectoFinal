import ExpressionTree from './tree.js'

function validarDatos(e) {
    e.preventDefault();
    const expresion = document.querySelector('#input').value;

    if(expresion === '') {
        alert('Esta vacio');
    } else {
        console.clear();
        let et = new ExpressionTree();

        let charArray = (infixToPostfix(tokenize(expresion)));
        let root = et.constructTree(charArray);
        console.log("Recorrido en Preorden");
        et.preorder(root);
        console.log("Recorrido en Postorden");
        et.postorder(root);
        console.log("Y el resultado es:")
        console.log(eval(expresion))
    }
    
};

function infixToPostfix(infix){
    const presedences = ["-", "+", "*", "/"];
    
	var opsStack = [],
    	postfix = [];
    
    for(let token of infix){

        if("number" === typeof token){
        	postfix.push(token); continue;
        }
        let topOfStack = opsStack[opsStack.length - 1];

        if(!opsStack.length || topOfStack == "("){
        	opsStack.push(token); continue;
        }

        if(token == "("){
	        opsStack.push(token); continue;
        }

        if(token == ")"){
        	while(opsStack.length){
            	let op = opsStack.pop();
                if(op == "(")	break;
                postfix.push(op);
            }
            continue;
        }

		let prevPresedence = presedences.indexOf(topOfStack),
        	currPresedence = presedences.indexOf(token);
        while(currPresedence < prevPresedence){
            let op = opsStack.pop();
            postfix.push(op);
            prevPresedence = presedences.indexOf(opsStack[opsStack.length - 1]);
        }
        opsStack.push(token);
	}

    while(opsStack.length){
        let op = opsStack.pop();
        if(op == "(")	break;
        postfix.push(op);
    }
    
    return postfix;
}

function tokenize(exp){
    const expresion = [];

    for(let letra of exp) {
        if(letra !== ' ') {
            expresion.push(letra)
        } 
    }

    let expresion1 = expresion.map((token, i) => /^\d$/.test(token) ? +token : token);
	return expresion1;
}


function log(obj){
	document.querySelector("pre").textContent += JSON.stringify(obj) + "\n";
}

export {validarDatos, tokenize, log, infixToPostfix};
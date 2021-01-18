const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit', validarDatos);

function validarDatos(e){
    e.preventDefault();
    const expresion = document.querySelector('#input').value;

    if(expresion == ''){
        alert('Ingresa un dato valido');
    }else{
        console.clear();
        let et = new ExpressionTree();

        let charArray = (infixToPostfix(tokenize(expresion)));
        let root = et.constructTree(charArray);


        console.log("Recorrido en Preorden");
        et.preorder(root);
        console.log("Recorrido en Postorden");
        et.postorder(root);
        console.log("Y el resultado es:");
        console.log(eval(expresion));

    }
}


class Node {
    constructor(value){ 
      this.value = value
      this.left = null
      this.right = null
    }
}
  
class Stack {
    constructor(){
        this.data = [];
        this.top = 0;
    }

    push(element) {
        this.data[this.top] = element;
        this.top = this.top + 1;
    }
    
    length() {
        return this.top;
    }

    peek() {
        return this.data[this.top-1];
    }

    isEmpty() {
        return this.top === 0;
    }

    pop() {
        if( this.isEmpty() === false ) {
            this.top = this.top -1;
            return this.data.pop(); 
        }
    }

    print() {
        var top = this.top - 1; 
        while(top >= 0) { 
            console.log(this.data[top]);
            top--;
        }
    }

    reverse() {
        this._reverse(this.top - 1 );
    }

    _reverse(index) {
        if(index != 0) {
            this._reverse(index-1);
        }
        console.log(this.data[index]);
    }
}
  
  
function infixToPostfix(infix){
    const presedences = ["-", "+", "*", "/"];  
    var opsStack = [], postfix = [];
    
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
        
        let prevPresedence = presedences.indexOf(topOfStack);
        let currPresedence = presedences.indexOf(token);

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
    const expresion = []
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
  
class ExpressionTree {
    isOperator(c) {
        if (c == '+' || c == '-' || c == '*' || c == '/' || c == '^') {
            return true;
        }
        return false;
    }

    inorder(t) {
        if (t != null) {
            this.inorder(t.left);
            console.log(t.value);
            this.inorder(t.right);
        }
    }

    preorder(t) {
        if (t != null) {
            console.log(t.value);
            this.preorder(t.left);
            this.preorder(t.right);
        }
    }
    
    postorder(t) {
        if (t != null) {
            this.postorder(t.left);
            this.postorder(t.right);
            console.log(t.value);
        }
    }
    
    constructTree(postfix) {
        let st = new Stack();
        let t, t1, t2
        for (let i = 0; i < postfix.length; i++) {

            if (!this.isOperator(postfix[i])) {
                t = new Node(postfix[i]);
                st.push(t);
            } else{
                t = new Node(postfix[i]);

                t1 = st.pop();      
                t2 = st.pop();

                t.right = t1;
                t.left = t2;

                st.push(t);
            }
        }

        t = st.peek();
        st.pop();

        return t;
    }
}

   

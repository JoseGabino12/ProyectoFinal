import Node from './node.js';
import Stack from './stack.js'

export default class ExpressionTree {
 
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
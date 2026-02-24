

## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
getElementById, getElementsByClassName, querySelector, and querySelectorAll are JavaScript methods used to find elements from an HTML page. getElementById is used to select one element using its id. getElementsByClassName is used to select all elements that have the same class name. querySelector uses a CSS selector and returns only the first matching element. querySelectorAll also uses a CSS selector, but it returns all matching elements. In simple words, getElementById finds one element by id, getElementsByClassName finds many elements by class, querySelector finds the first match, and querySelectorAll finds all matches.

### 2. How do you create and insert a new element into the DOM?
To create and insert a new element into the DOM in JavaScript, we usually follow a few simple steps. First, we create the element using document.createElement(). Then we add text or content to that element. Finally, we insert it into the HTML page using methods like appendChild().

### 3. What is Event Bubbling? And how does it work?
Event Bubbling is a behavior in JavaScript where an event starts on a target element and then moves upward through its parent elements.
In simple words, when you click on a child element, the event first happens on that child element. After that, the same event moves to its parent, then to the grandparent, and continues moving upward until it reaches the document. This upward movement of the event through the DOM is called Event Bubbling.

### 4. What is Event Delegation in JavaScript? Why is it useful?
Event Delegation is a technique in JavaScript where instead of adding an event listener to many child elements, we add the event listener to their parent element. The parent handles the event when it bubbles up from the children.
In simple words, when a child element is clicked, the event moves up to the parent because of event bubbling. The parent can then detect which child triggered the event and respond accordingly.
This is useful because it improves performance, reduces the number of event listeners, and also works for dynamically added elements that were not in the page before. For example, if you have many list items, you can add one event listener to the #ul instead of adding a listener to every #li

### 5. What is the difference between preventDefault() and stopPropagation() methods?
In JavaScript, preventDefault() is used to stop the browser’s default behavior for an element. For example, clicking a link normally opens a new page, or submitting a form reloads the page. Using preventDefault() prevents these default actions from happening, while still allowing the event to run. On the other hand, stopPropagation() is used to stop the event from bubbling up to parent elements. For instance, if a child element inside a div is clicked, normally the parent’s click event would also trigger. Using stopPropagation() stops the event at the child element, preventing it from affecting its parent elements.

class FSM {
  /**
    * Creates new FSM instance.
    * @param config
    */
   constructor(config) {
     if (! config)  throw new Error();
       this.state = config.initial;
       this.history = ['normal'];
       this.undoArr = [];
       this.config = config;
   }
   
   /**
    * Returns active state.
    * @returns {String}
    */
   getState() {
     return this.state = this.state;
   }
 
   /**
    * Goes to specified state.
    * @param state
    */
   changeState(state) {
     if (state === 'normal' || state === 'busy' || state === 'sleeping' || state === 'hungry') {
       this.history.push(state);
       return  this.state = state;
     } else throw new Error(); 
   }
   /**
    * Changes state according to event transition rules.
    * @param event
    */
   trigger(event) {
if (event === 'study' || event === 'get_tired' || event === 'get_hungry' || event === 'eat' || event === 'get_up') {
     let result = this.config.states[this.state].transitions[event];
     if (!result) throw new Error();
     this.history.push(result);
     return this.state = result;
     } else throw new Error();
     
   }
 
   /**
    * Resets FSM state to initial.
    */
   reset() {
     this.state = this.config.initial;
   }
 
   /**
    * Returns an array of states for which there are specified event transition rules.
    * Returns all states if argument is undefined.
    * @param event
    * @returns {Array}
    */
   getStates(event) {
     if (!event) {
       return ['normal', 'busy', 'hungry', 'sleeping'];
     } else if (event === 'study' || event === 'get_tired' ||  event ==='get_hungry' ||  event ==='eat' ||  event ==='get_up') {
       return Object.keys(this.config.states)
 .filter(state => this.config.states[state].transitions[event]);
     } else if (event !== 'study' || event !== 'get_tired' || event !=='get_hungry' || event !=='eat' || event !=='get_up') {
      return [];
     }}
     
   /**
    * Goes back to previous state.
    * Returns false if undo is not available.
    * @returns {Boolean}
    */
   undo() {
     if ( this.history.length === 0) {
       return false;
     } else {
       let popArr = this.history.pop();
       this.state = this.history[this.history.length -1 ];
      this.undoArr.push(popArr);
      if ( this.history.length === 0) {
        return false;
      } else {
      return true;
       }
     }
   }
   
   /**
    * Goes redo to state.
    * Returns false if redo is not available.
    * @returns {Boolean}
    */
   redo() {
   if ( this.history.length === 0) {
     return false;
  } else if (this.state === this.history[this.history.length - 1]) {
    return false;
  } else {
    if (this.undoArr.length === 0) {
      return false;
    } else {
   let redoArr = this.undoArr.pop();
   this.history.push(redoArr);
   this.state = this.history[this.history.length -1 ];
     return true;}
      }
   }
   
 
 
   /**
    * Clears transition history
    */
   clearHistory() {
     return this.history = [];
   }
 }
 
 module.exports = FSM;
 
 /** @Created by Uladzimir Halushka **/
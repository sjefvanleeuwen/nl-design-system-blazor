/**
 * @class AutoResizeNavigation
 * Creates an navigation component that automatically puts items in a menu to fit in the available width
 *
 * Example:
 *
 * <code>
 *   <div>
 *      <nav class="nav nav--simple nav--donkergeel">
 *          <div class="container">
 *               <div class="nav-autoresize">
 *                   <ul class="nav">
 *                       <li class="nav__item">
 *                            <a class="nav__link" href="#">Core</a>
 *                       </li>
 *                       <li class="nav__item">
 *                            <a class="nav__link nav__link--active" href="#">Componenten</a>
 *                       </li>
 *                       <li class="nav__item">
 *                           <a class="nav__link" href="#">Changelog</a>
 *                       </li>
 *                    </ul>
 *               </div>
 *           </div>
 *       </nav>
 *    </div>
 *    <script>
 *      // Load nav component
 *      System.import('/uno/components/navigation/navigation.js').then(function (module) {
 *      var navs = document.querySelectorAll('.nav-autoresize > ul');
 *      // Initialize all navs
 *      for (let i = 0; i < navs.length; i++) {
 *          new module.AutoResizeNavigation(navs.item(i));
 *      }
 *      });
 *    </script>
 * </code>
 */
export declare class AutoResizeNavigation {
    private host;
    private _navWidth;
    private _moreNav;
    private _resizeTimeout;
    private _ul;
    private _navClickListener;
    private resizeListener;
    private windowClickListener;
    constructor(host: Element);
    /**
     * Creates a 'more' button, which can hold all clones
     * @private
     */
    private _createMoreNav();
    private _navClassToggle(element, cssClass);
    private _onWindowClick();
    private _setup();
    private _setFlexClasses();
    private _rearrange();
    /**
     * Creates a clone of every nav and moves it inside the more button
     * @private
     */
    private _createClones();
    private _onScreenResize();
    /**
     * Stores the width of each nav and calculates the total width
     * @private
     */
    private _storeWidths();
    /**
     * Removes references for correct GC
     */
    destroy(): void;
}
export declare class SubMenuNavigation {
    private host;
    private _navClickListener;
    private windowClickListener;
    constructor(host: Element);
    private _navClassToggle(element, cssClass);
    private _navClassRemove(element, cssClass);
    /**
     * Removes references for correct GC
     */
    destroy(): void;
}

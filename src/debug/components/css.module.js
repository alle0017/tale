export default /*css*/`
            .tooltip .tooltip-text {
                  visibility: hidden;
                  background-color: var(--n1);
                  color: var(--c0);
                  text-align: center;
                  border-radius: var(--br0);
                  border: var(--border1);
                  padding: 5%;

                  /* Position the tooltip */
                  position: absolute;
                  z-index: 1;
            }

            .tooltip:hover .tooltip-text {
                  visibility: visible;
            }
            ul.tree {
                  list-style-type: none;
                  text-indent: 5px;
                  padding-inline-start: 20px;
            }
            li.tree {
                  width: 200px;
                  height: 18px;
                  padding: 5px;
                  border-radius: 7px;
                  list-style-type: none;
            }
            li.tree:hover {
                  background-color: var(--n1);
                  cursor: pointer;
            }
      `;
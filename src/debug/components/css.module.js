export default /*css*/`
            :root {
                  --bg: #151515ff;
                  --bg2: #292929ff;
                  --color: #fff; 
            }
            .tooltip .tooltip-text {
                  visibility: hidden;
                  background-color: var(--bg);
                  text-align: center;
                  border-radius: 7px;;
                  border: 2px solid var(--bg2);
                  padding: 5%;

                  /* Position the tooltip */
                  position: absolute;
                  z-index: 1;
            }

            .tooltip:hover .tooltip-text {
                  visibility: visible;
            }
            ul.tree {
                  display: flex;
                  flex-direction: column;
                  gap: 10px;
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
                  background-color: var(--bg2);
                  cursor: pointer;
            }
            .hv:hover {
                  background-color: var(--bg2);
                  border-radius: 5px;
            }
      `;
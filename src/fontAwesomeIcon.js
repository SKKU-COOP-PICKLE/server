import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faBraille, faProjectDiagram, faBrain, faChartBar, faLink, faRedo, faUndo } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons"


library.add(faBraille, faProjectDiagram, faChartBar, faBrain, faLink, faRedo, faUndo);
library.add(faTrashAlt); 
library.add(faTimes);
// fontawesome아이콘을 Vue탬플릿에 사용할 수 있게 등록해 줍니다.
Vue.component("font-awesome-icon", FontAwesomeIcon);
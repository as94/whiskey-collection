import { breadcrumbs } from './breadcrumbs.js';
import { getCategory } from '../../services/categoryChanges.js';

$('#breadcrumbs').html(breadcrumbs(['Home', getCategory()]));

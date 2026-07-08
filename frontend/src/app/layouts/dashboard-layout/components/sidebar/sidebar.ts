import { Component } from '@angular/core';
import { FolderTree } from '../../../../features/documents/components/folder-tree/folder-tree';
import { UserMenu } from '../user-menu/user-menu';

/**
 * Sidebar del DashboardLayout: marca, **árbol de carpetas** (que nace del nodo
 * "Inicio") y footer con el menú de usuario. El estado de navegación vive en el
 * árbol/`FolderService`.
 */
@Component({
  selector: 'app-sidebar',
  imports: [FolderTree, UserMenu],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {}

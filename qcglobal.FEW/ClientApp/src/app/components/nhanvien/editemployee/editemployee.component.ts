import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent {
  tabElements = [
    {
      id: 'profile',
      triggerEl: document.querySelector('#profile-tab-example'),
      targetEl: document.querySelector('#profile-example')
    },
    {
      id: 'dashboard',
      triggerEl: document.querySelector('#dashboard-tab-example'),
      targetEl: document.querySelector('#dashboard-example')
    },
    {
      id: 'settings',
      triggerEl: document.querySelector('#settings-tab-example'),
      targetEl: document.querySelector('#settings-example')
    },
    {
      id: 'contacts',
      triggerEl: document.querySelector('#contacts-tab-example'),
      targetEl: document.querySelector('#contacts-example')
    }
  ];

  // options with default values
  options = {
    defaultTabId: 'settings',
    activeClasses: 'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500',
    inactiveClasses: 'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
    onShow: () => {
      console.log('tab is shown');
    }
  };

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  addNewRow() {
    const el = document.createElement('tr');

    el.innerHTML = `
                      <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                            <input
                            class="bg-white text-left h-8 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#196898]"
                            id="inline-full-name"
                            type="text"
                            value=""
                          />
                    </th>
                    <td class="py-4 px-6">
                            <input
                            class="bg-white text-left h-8 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#196898]"
                            id="inline-full-name"
                            type="text"
                            value=""
                          />
                    </td>
                    <td class="py-4 px-6">
                          <input
                          class="bg-white text-left h-8 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#196898]"
                          id="inline-full-name"
                          type="text"
                          value=""
                        />
                    </td>
                    <td class="py-4 px-6">
                            <input
                            class="bg-white text-left h-8 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#196898]"
                            id="inline-full-name"
                            type="text"
                            value=""
                          />
                    </td>
                  `;

    // ✅ (Optionally) Set Attributes on Element
    el.setAttribute('class', 'bg-white border-b dark:bg-gray-800 dark:border-gray-700');

    // ✅ add element to DOM
    const box = document.getElementById('tbContent');

    box?.appendChild(el);
  }
}

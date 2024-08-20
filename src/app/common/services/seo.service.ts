import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  /**
   * Method to update the <meta> tags based on content.
   * @param name This inputs for name attribute of <meta> tag.
   * @param content This inputs for content attribute of <meta> tag.
   */
  updateTag(name: string, content: string): void {
    this.meta.updateTag({ name: name, content: content });
  }

  /**
   * Method to update the title of the webpage based on content.
   * @param title Title of the web page.
   */
  updateTitle(title: string): void {
    this.title.setTitle(title);
  }
}

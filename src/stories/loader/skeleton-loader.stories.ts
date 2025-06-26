export default {
    title: 'Components/Loader/Skeleton',
    parameters: {
        layout: 'centered',
        actions: {
            disable: true
        },
        interactions: {
            disable: true
        }
    },
    tags: ['autodocs', '!dev']
};

export const BasicSkeletonLoader = {
    render: (args: any) => {
        const { ...props } = args;

        const component = {
            loading: true,
            toggleLoading() {
                this.loading = !this.loading;
            },
            getLoadingClass() {
                return { 'ds-loading-data': this.loading };
            }
        };

        return {
            props: {
                ...props,
                component
            },
            template: `
               <div class="ds-skeleton-loader">
                   <button
                       class="ds-button --primary ds-m-auto"
                       (click)="component.toggleLoading()">
                       Toggle skeleton loader
                   </button>
                   <div class="ds-card ds-mt-64">
                       <div class="ds-card__content">
                           <div
                               class="ds-flex --row --start-center"
                               [ngClass]="component.getLoadingClass()">
                               <div class="ds-avatar --solid --xl">HM</div>
                               <div class="ds-row ds-flex --column ds-ml-24">
                                   <h3 class="ds-m-0">
                                        Hollis Mason
                                    </h3>
                                    <div>
                                        Sex: M &nbsp;&nbsp; DOB: 09/21/1934
                                    </div>
                                    <div>
                                        Location: New York, NY
                                    </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           `
        };
    },
    parameters: {
        docs: {
            source: {
                language: 'html',
                type: 'code',
                code: `loading: true,
toggleLoading() {
    this.loading = !this.loading;
},
getLoadingClass() {
    return { 'ds-loading-data': this.loading };
}

<qds-button
   (clickHandler)={toggle}
   label="Toggle skeleton loader"
/>
 
<div [ngClass]="getLoadingClass()">
    Content to mask goes here.
</div>`
            }
        }
    }
};

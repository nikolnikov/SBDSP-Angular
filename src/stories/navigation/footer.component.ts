import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'qds-footer',
    template: `
        <footer>
            <div
                class="ds-footer ds-grid"
                [class]="customClasses"
                [class.--light]="hideNav"
                [class.--margins]="!noMargins"
                [class.--max-width]="!noMaxWidth"
            >
                <div class="ds-footer__wrapper">
                    <div *ngIf="!hideLogo" class="ds-brand-wrapper --small">
                        <img
                            src="https://ds.cdn.questdiagnostics.com/assets/img/qd-brand--stacked--white.svg"
                        />
                    </div>

                    <div class="ds-footer__content">
                        <div *ngIf="!hideNav" class="ds-footer__company">
                            <div class="ds-footer__company-links">
                                <button
                                    class="ds-footer__link-title"
                                    [class.--opened]="showFooterLinks"
                                    (click)="showFooterLinks = !showFooterLinks"
                                >
                                    <span class="--plus"></span>
                                    Our company
                                </button>

                                <ul>
                                    <li>
                                        <a
                                            class="ds-link"
                                            href="https://www.questdiagnostics.com/our-company/about-us"
                                            >About us</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            class="ds-link"
                                            href="https://www.questdiagnostics.com/our-company/how-we-operate"
                                            >How we operate</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            class="ds-link"
                                            href="https://www.questdiagnostics.com/our-company/what-we-do"
                                            >What we do</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            class="ds-link"
                                            href="https://www.questdiagnostics.com/our-company/corporate-responsibility"
                                            >Corporate responsibility</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            class="ds-link"
                                            href="https://www.questdiagnostics.com/our-company/inclusion-diversity"
                                            >Inclusion and diversity</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            class="ds-link"
                                            href="https://www.questdiagnostics.com/our-company/actions-insights"
                                            >Actions and insights</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            class="ds-link"
                                            href="https://www.questdiagnostics.com/our-company/suppliers-partners"
                                            >Suppliers</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            class="ds-link"
                                            href="https://www.questhealth.com/?itm_campaign=QD-Bottom-Nav-ShopallHP"
                                            >Shop tests</a
                                        >
                                    </li>
                                </ul>
                            </div>

                            <div class="ds-footer__company-options">
                                <a
                                    class="ds-button --inverse --small"
                                    aria-label="Locations"
                                    href="https://www.questdiagnostics.com/home/about/locations/"
                                >
                                    <label>Locations</label>
                                </a>
                                <a
                                    class="ds-button --inverse --small"
                                    aria-label="Career"
                                    href="https://careers.questdiagnostics.com/"
                                >
                                    <label>Careers</label>
                                </a>
                                <a
                                    class="ds-button --inverse --small"
                                    aria-label="Investors"
                                    href="https://ir.questdiagnostics.com/overview/default.aspx"
                                >
                                    <label>Investors</label>
                                </a>
                                <a
                                    class="ds-button --inverse --small"
                                    aria-label="Specilaty labs"
                                    href="https://www.questdiagnostics.com/our-company/specialty-labs"
                                >
                                    <label>Specialty labs</label>
                                </a>
                                <a
                                    class="ds-button --inverse --small"
                                    aria-label="Newsroom"
                                    href="https://newsroom.questdiagnostics.com/"
                                >
                                    <label>Newsroom</label>
                                </a>

                                <div class="ds-footer__social">
                                    <div class="ds-footer__social-title">
                                        Connect with us
                                    </div>

                                    <a
                                        class="ds-footer__social-link"
                                        href="https://www.questdiagnostics.com/social-media"
                                    >
                                        <span
                                            class="ds-icon--facebook-logo-fill"
                                            aria-label="facebook"
                                        ></span>
                                    </a>
                                    <a
                                        class="ds-footer__social-link"
                                        href="https://www.questdiagnostics.com/social-media"
                                    >
                                        <span
                                            class="ds-icon--twitter-logo-fill"
                                            aria-label="twitter"
                                        ></span>
                                    </a>
                                    <a
                                        class="ds-footer__social-link"
                                        href="https://www.questdiagnostics.com/social-media"
                                    >
                                        <span
                                            class="ds-icon--youtube-logo-fill"
                                            aria-label="youtube"
                                        ></span>
                                    </a>
                                    <a
                                        class="ds-footer__social-link"
                                        href="https://www.questdiagnostics.com/social-media"
                                    >
                                        <span
                                            class="ds-icon--linkedin-logo-fill"
                                            aria-label="linkedin"
                                        ></span>
                                    </a>
                                    <a
                                        class="ds-footer__social-link"
                                        href="https://www.questdiagnostics.com/social-media"
                                    >
                                        <span
                                            class="ds-icon--instagram-logo"
                                            aria-label="instagram"
                                        ></span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="ds-footer__legal">
                            <ul class="ds-col-12 ds-flex --row --wrap">
                                <li>
                                    <a
                                        class="ds-link"
                                        href="https://www.questdiagnostics.com/site-map"
                                        >Site map</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="ds-link"
                                        href="https://www.questdiagnostics.com/our-company/privacy"
                                        >Privacy notices</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="ds-link"
                                        href="https://www.questdiagnostics.com/our-company/terms-conditions"
                                        >Terms</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="ds-link"
                                        href="https://www.questdiagnostics.com/contact-us"
                                        >Contact us</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="ds-link"
                                        href="https://www.questdiagnostics.com/our-company/nondiscrimination"
                                        >Language assistance /
                                        Non-discrimination</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="ds-link"
                                        href="https://www.questdiagnostics.com/our-company/nondiscrimination"
                                        >Asistencia de idiomas / Aviso de no
                                        discriminación</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="ds-link"
                                        href="https://www.questdiagnostics.com/our-company/nondiscrimination"
                                        >語言協助 / 不歧視通知</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="ds-link"
                                        href="https://www.questdiagnostics.com/our-company/privacy/privacy-shield"
                                        >Privacy shield</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="ds-link"
                                        href="https://www.questdiagnostics.com/our-company/accessibility"
                                        >Accessibility</a
                                    >
                                </li>
                                <li>
                                    <a class="ds-link --icons" href="">
                                        <img
                                            src="https://ds.cdn.questdiagnostics.com/assets/img/your-privacy.svg"
                                            alt="Your Privacy Choices"
                                        />
                                        <span>Your Privacy Choices</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class="ds-footer__copyright">
                            Quest<sup>&reg;</sup> is the brand name used for
                            services offered by Quest Diagnostics Incorporated
                            and its affiliated companies. Quest Diagnostics
                            Incorporated and certain affiliates are CLIA
                            certified laboratories that provide HIPAA covered
                            services.  Other affiliates operated under the
                            Quest<sup>&reg;</sup> brand, such as Quest Consumer
                            Inc., do not provide HIPAA covered services.<br /><br />

                            Quest, Quest Diagnostics, any associated logos, and
                            all associated Quest Diagnostics registered or
                            unregistered trademarks are the property of Quest
                            Diagnostics. All third party marks —
                            <sup>&reg;</sup> and &trade; — are the property of
                            their respective owners. &copy; {{ year }}
                            Quest Diagnostics Incorporated. All rights reserved.
                            Image content features models and is intended for
                            illustrative purposes only.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    `
})
export class QDSFooterComponent implements AfterViewInit {
    @Input() customClasses: string = '';
    @Input() hideLogo: boolean = false;
    @Input() hideNav: boolean = false;
    @Input() noMargins: boolean = false;
    @Input() noMaxWidth: boolean = false;

    year: number = new Date().getFullYear();
    showFooterLinks = false;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const attrs = this.el.nativeElement.getAttributeNames();
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }
}

import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QDSIconComponent } from '../icon/icon.component';
import { QDSIconButtonComponent } from '../button/icon-button.component';
import { QDSButtonComponent } from '../button/button.component';
import { QDSSidesheetComponent } from '../sidesheet/sidesheet.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { QDSToastComponent } from '../toast/toast.component';

export interface ChatbotFeedbackOption {
    id?: string;
    label?: string;
    action?: (opt?: any) => void;
    [key: string]: any;
}

export interface ChatbotResponseItem {
    id?: string;
    response?: string;
    followup?: string;
}

export interface ChatbotSuggestion {
    question: string;
    action?: (suggestion?: ChatbotSuggestion) => void;
}

export interface ChatbotTurn {
    id: string;
    question: string;
    response?: string;
    option?: ChatbotSuggestion;
}

@Component({
    selector: 'qds-chatbot',
    standalone: true,
    imports: [
        CommonModule,
        QDSIconComponent,
        QDSIconButtonComponent,
        QDSButtonComponent,
        QDSSidesheetComponent,
        MatTooltipModule,
        MatSnackBarModule,
        QDSToastComponent
    ],
    template: `
        <qds-sidesheet
            [isChatbot]="true"
            [toggleSidesheet]="openChatbotSidesheet"
            (openSidesheet)="openChatbotSidesheet = $event"
            title="Chatbot"
        >
            <div
                class="ds-chatbot"
                [ngClass]="{
                    '--extended': isExtended,
                    '--no-header': hideHeader
                }"
                #chatbotRef
            >
                <!-- Header -->
                <div
                    *ngIf="!hideHeader"
                    class="ds-chatbot__header"
                    [ngClass]="{ '--scrolled': isScrolled }"
                >
                    <div class="ds-chatbot__header-title">
                        <qds-icon name="ai" class="ds-mr-8" />
                        <span>{{ title || '' }}</span>
                    </div>
                    <div class="ds-chatbot__header-actions">
                        <qds-icon-button
                            *ngIf="conversation.length > 0"
                            icon="arrow-clockwise"
                            (clickHandler)="handleRestart()"
                            size="md"
                            tooltip="Restart chat"
                        />
                        <qds-icon-button
                            [icon]="
                                isExtended
                                    ? 'arrows-in-simple'
                                    : 'arrows-out-simple'
                            "
                            (clickHandler)="toggleExtend()"
                            size="md"
                            [tooltip]="isExtended ? 'Collapse' : 'Expand'"
                        />
                        <qds-icon-button
                            icon="close"
                            (clickHandler)="handleClose()"
                            size="md"
                            tooltip="Close"
                        />
                    </div>
                </div>

                <!-- Content -->
                <div
                    class="ds-chatbot__content"
                    #chatbotContentRef
                    (scroll)="onChatbotScroll($event)"
                >
                    <!-- Intro / Suggestions -->
                    <div
                        *ngIf="!conversation.length"
                        class="ds-chatbot__intro"
                        [ngSwitch]="hasConsented"
                    >
                        <!-- Consent Block -->
                        <ng-container *ngSwitchCase="false">
                            <qds-icon name="ai" size="32" />
                            <h2>Consent</h2>
                            By clicking 'I Consent’ below, you agree to the AI
                            Chat Terms of Use which include providing this AI
                            tool access to your information in order to answer
                            questions about your lab results. This AI is
                            programmed to provide general information and should
                            not be considered a substitute for professional
                            medical advice.
                            <div
                                class="ds-mt-16 ds-flex --row --wrap --end-center"
                            >
                                <qds-button
                                    (clickHandler)="handleClose()"
                                    label="Cancel"
                                    size="sm"
                                    type="secondary"
                                />
                                <qds-button
                                    (clickHandler)="consented()"
                                    type="primary"
                                    label="I consent"
                                    size="sm"
                                />
                            </div>
                        </ng-container>
                        <!-- Suggestions Block -->
                        <ng-container *ngSwitchCase="true">
                            <div class="ds-chatbot__suggestions">
                                <div class="ds-chatbot__suggestions-preamble">
                                    <qds-icon name="ai" size="32" />
                                    <h2 *ngIf="introTitle">{{ introTitle }}</h2>
                                    <div *ngIf="introMessage">
                                        {{ introMessage }}
                                    </div>
                                    <div
                                        *ngIf="suggestionQuestions?.length"
                                        class="ds-chatbot__suggestions-options"
                                    >
                                        <qds-button
                                            *ngFor="
                                                let option of suggestionQuestions;
                                                index as i
                                            "
                                            (clickHandler)="
                                                handleSuggestionSelect({
                                                    question: option.question,
                                                    option
                                                })
                                            "
                                            [label]="option.question"
                                            type="option"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ng-container>
                    </div>

                    <!-- Conversation -->
                    <ng-container *ngIf="conversation.length">
                        <ng-container
                            *ngFor="let turn of conversation; index as idx"
                        >
                            <div class="ds-chatbot__question">
                                {{ turn.question }}
                            </div>
                            <div
                                class="ds-chatbot__response"
                                data-testid="chatbot-response"
                            >
                                <ng-container
                                    *ngIf="
                                        !visibleResponses[turn.id];
                                        else responseBlock
                                    "
                                >
                                    <div class="ds-loading-data"></div>
                                </ng-container>
                                <ng-template #responseBlock>
                                    {{ getPrimary(turn, idx) }}
                                    <div
                                        *ngIf="getFollowup(idx)"
                                        class="ds-chatbot__response-followup"
                                    >
                                        {{ getFollowup(idx) }}
                                    </div>
                                    <div class="ds-chatbot__response-actions">
                                        <button
                                            *ngIf="!copiedByTurn[turn.id]"
                                            class="ds-button --icon --md"
                                            matTooltip="Copy"
                                            aria-label="copy"
                                            (click)="
                                                copyContent(
                                                    getPrimary(turn, idx),
                                                    turn.id
                                                )
                                            "
                                        >
                                            <qds-icon name="copy" />
                                        </button>

                                        <button
                                            *ngIf="copiedByTurn[turn.id]"
                                            class="ds-button --icon --md"
                                            matTooltip="Copied"
                                            aria-label="copied"
                                            (click)="noop()"
                                        >
                                            <qds-icon name="check" />
                                        </button>

                                        <button
                                            class="ds-button --icon --md"
                                            matTooltip="Good response"
                                            aria-label="thumbs-up"
                                            (click)="onThumbUp(turn)"
                                        >
                                            <qds-icon
                                                [name]="
                                                    activeThumbs[turn.id] ===
                                                    'up'
                                                        ? 'thumbs-up-filled'
                                                        : 'thumbs-up'
                                                "
                                            />
                                        </button>

                                        <button
                                            class="ds-button --icon --md"
                                            matTooltip="Bad response"
                                            aria-label="thumbs-down"
                                            (click)="onThumbDown(turn)"
                                        >
                                            <qds-icon
                                                [name]="
                                                    activeThumbs[turn.id] ===
                                                    'down'
                                                        ? 'thumbs-down-filled'
                                                        : 'thumbs-down'
                                                "
                                            />
                                        </button>

                                        <button
                                            class="ds-button --icon --md"
                                            matTooltip="Try again"
                                            (click)="handleRetry(turn)"
                                            aria-label="retry"
                                        >
                                            <qds-icon
                                                name="arrows-counter-clockwise"
                                            />
                                        </button>
                                    </div>
                                    <div
                                        *ngIf="
                                            activeThumbs[turn.id] === 'down' &&
                                            feedbackVisibility[turn.id]
                                        "
                                        class="ds-chatbot__feedback"
                                    >
                                        <div
                                            class="ds-chatbot__feedback-content"
                                        >
                                            <div
                                                class="ds-chatbot__feedback-title"
                                            >
                                                Provide Feedback:
                                            </div>
                                            <div
                                                class="ds-chatbot__feedback-options"
                                                *ngIf="feedbackOptions?.length"
                                            >
                                                <qds-button
                                                    *ngFor="
                                                        let opt of feedbackOptions
                                                    "
                                                    (clickHandler)="
                                                        onFeedback(opt)
                                                    "
                                                    [label]="opt.label || ''"
                                                    type="option"
                                                />
                                            </div>
                                        </div>
                                        <div class="ds-chatbot__feedback-close">
                                            <qds-icon-button
                                                (clickHandler)="
                                                    hideFeedback(turn.id)
                                                "
                                                icon="close"
                                                size="md"
                                            />
                                        </div>
                                    </div>
                                </ng-template>
                            </div>
                        </ng-container>
                    </ng-container>
                </div>

                <!-- Footer -->
                <div class="ds-chatbot__footer" *ngIf="hasConsented">
                    <div class="ds-chatbot__search">
                        <div
                            class="ds-input --textarea"
                            [ngClass]="{ '--disabled': askInputDisabled }"
                        >
                            <button
                                class="ds-button --icon --md"
                                matTooltip="Add files"
                                (clickHandler)="
                                    askInputAttachHandler &&
                                        askInputAttachHandler()
                                "
                                aria-label="attach"
                            >
                                <qds-icon name="paperclip" />
                            </button>

                            <textarea
                                #textareaRef
                                class="ds-textarea"
                                [disabled]="askInputDisabled"
                                [id]="askInputId || null"
                                [rows]="minRows"
                                (input)="onInputChange($event)"
                                (keydown)="handleKeyDown($event)"
                                [placeholder]="
                                    askInputPlaceholder || 'Ask anything'
                                "
                                [value]="internalInputValue || ''"
                                style="resize: none; overflow-y: auto"
                                aria-label="Chat input"
                            ></textarea>
                            <button
                                class="ds-button --icon --md"
                                matTooltip="Dictate"
                                (clickHandler)="
                                    askInputVoiceHandler &&
                                        askInputVoiceHandler()
                                "
                                aria-label="dictate"
                            >
                                <qds-icon name="microphone" />
                            </button>
                        </div>
                        <qds-icon-button
                            (clickHandler)="handleSubmit()"
                            icon="arrow-circle-up"
                        />
                    </div>
                    <div class="ds-chatbot__copyright">
                        By using QuestAI, you agree to the
                        <a href="#" class="ds-link">terms of use</a>.
                    </div>
                </div>
            </div>
        </qds-sidesheet>

        <qds-button
            (clickHandler)="openChatbotSidesheet = true"
            label="Open Chatbot"
            type="primary"
        />
    `
})
export class QDSChatbotComponent implements AfterViewInit, OnChanges {
    @Input() askInputAttachHandler?: () => void;
    @Input() askInputDisabled?: boolean;
    @Input() askInputId?: string;
    @Input() askInputOnChange?: (e: any) => void;
    @Input() askInputPlaceholder?: string | 'Ask anything';
    @Input() askInputSubmitHandler?: () => void;
    @Input() askInputValue?: string;
    @Input() askInputVoiceHandler?: () => void;
    @Input() customClasses?: string;
    @Input() feedbackOptions: ChatbotFeedbackOption[] = [];
    @Input() hideHeader?: boolean;
    @Input() isRestarted: boolean = false;
    @Input() introTitle: string = '';
    @Input() introMessage: string = '';
    @Input() responses: ChatbotResponseItem[] = [];
    @Input() responseLoadingDelay: number = 0;
    @Input() suggestionQuestions: ChatbotSuggestion[] = [];
    @Input() thumbsDownHandler?: (turn: ChatbotTurn) => void;
    @Input() thumbsUpHandler?: (turn: ChatbotTurn) => void;
    @Input() title?: string = 'Chat with AI';

    @Output() onClose = new EventEmitter<void>();
    @Output() restart = new EventEmitter<void>();
    @Output() onRetry = new EventEmitter<ChatbotTurn>();

    @ViewChild('chatbotRef') chatbotRef?: ElementRef<HTMLDivElement>;
    @ViewChild('chatbotContentRef')
    chatbotContentRef?: ElementRef<HTMLDivElement>;

    // Local UI state
    openChatbotSidesheet = false; // moved from (incorrect) file-level scope
    isExtended = false;
    hasConsented = false;
    conversation: ChatbotTurn[] = [];
    internalInputValue: string = '';
    isScrolled = false;

    visibleResponses: Record<string, boolean> = {};
    copiedByTurn: Record<string, boolean> = {};
    activeThumbs: Record<string, 'up' | 'down' | null> = {};
    feedbackVisibility: Record<string, boolean> = {};

    @ViewChild('textareaRef') textareaRef?: ElementRef<HTMLTextAreaElement>;
    minRows = 1;
    maxRows = 3;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private toast: MatSnackBar
    ) {}

    ngAfterViewInit(): void {
        this.stripHostAttributes();
        setTimeout(() => this.autoResize(), 0);
    }

    ngOnChanges() {
        if (this.isRestarted) {
            this.conversation = [];
            this.visibleResponses = {};
            this.copiedByTurn = {};
            this.activeThumbs = {} as any;
            this.feedbackVisibility = {};
        }

        if (!this.conversation || this.conversation.length === 0) {
            if (Object.keys(this.visibleResponses).length > 0) {
                this.visibleResponses = {};
            }
        } else {
            this.conversation.forEach(turn => {
                if (turn?.id && !this.visibleResponses[turn.id]) {
                    // Use configurable delay
                    setTimeout(() => {
                        this.visibleResponses = {
                            ...this.visibleResponses,
                            [turn.id]: true
                        };
                    }, this.responseLoadingDelay);
                }
            });
        }
        this.autoResize();
    }

    toggleExtend() {
        this.isExtended = !this.isExtended;
    }

    consented() {
        this.hasConsented = true;
    }

    onInputChange(e: any) {
        const val = e?.target?.value ?? '';
        this.internalInputValue = val;
        if (this.askInputOnChange) this.askInputOnChange(e);
        this.autoResize();
    }

    handleSubmit() {
        const valueToCheck = (
            this.internalInputValue ||
            this.askInputValue ||
            ''
        ).trim();
        if (valueToCheck.length > 0) {
            const id = `${Date.now()}-${this.conversation.length}`;
            this.conversation = [
                ...this.conversation,
                { id, question: valueToCheck }
            ];
            this.internalInputValue = '';
            this.showResponseWithDelay(id);
            this.scrollToBottom();
        }
        if (this.askInputSubmitHandler) {
            this.askInputSubmitHandler();
        }
    }

    handleRestart() {
        this.conversation = [];
        this.restart.emit();
    }

    handleSuggestionSelect(payload: {
        question: string;
        option?: ChatbotSuggestion;
    }) {
        const q = (payload?.question || payload?.option?.question || '').trim();
        if (!q) return;
        const id = `${Date.now()}-${this.conversation.length}`;
        this.conversation = [
            ...this.conversation,
            { id, question: q, option: payload.option }
        ];
        this.showResponseWithDelay(id);
        this.scrollToBottom();
        // Execute optional action on suggestion
        if (payload.option?.action) {
            try {
                payload.option.action(payload.option);
            } catch (e) {
                console.warn('ChatbotSuggestion action failed', e);
            }
        }
    }

    handleClose() {
        // Close the sidesheet UI and emit the close event
        this.openChatbotSidesheet = false;
        this.onClose.emit();
    }

    onChatbotScroll(e: Event) {
        const target = e.currentTarget as HTMLElement | null;
        const scrollTop = target?.scrollTop || 0;
        this.isScrolled = scrollTop > 0;
    }

    // --- Inlined former content component helpers ---
    getPrimary(turn: any, idx: number): string {
        const baseItem =
            (this.responses[idx] as any) || this.responses[0] || {};
        const normalized =
            typeof baseItem === 'string'
                ? { response: baseItem }
                : baseItem || {};
        const raw = turn?.response || normalized.response || '';
        return this.getPrimaryResponse(raw);
    }

    getFollowup(idx: number): string {
        const baseItem =
            (this.responses[idx] as any) || this.responses[0] || {};
        const normalized =
            typeof baseItem === 'string'
                ? { response: baseItem }
                : baseItem || {};
        return normalized.followup || '';
    }

    private getPrimaryResponse(response?: string): string {
        if (!response) return '';
        const marker = ' Do you want me';
        const idx = response.indexOf(marker);
        return idx >= 0 ? response.substring(0, idx) : response;
    }

    copyContent(text?: string, turnId?: string) {
        if (!text) return;
        navigator?.clipboard?.writeText(text).then(() => {
            if (!turnId) return;
            this.copiedByTurn = { ...this.copiedByTurn, [turnId]: true };
            setTimeout(() => {
                this.copiedByTurn = { ...this.copiedByTurn, [turnId]: false };
            }, 1500);
        });
    }

    noop() {}

    onThumbUp(turn: any) {
        const id = turn?.id;
        if (!id) return;
        const next = this.activeThumbs[id] === 'up' ? null : 'up';
        this.activeThumbs = { ...this.activeThumbs, [id]: next } as any;
        this.feedbackVisibility = { ...this.feedbackVisibility, [id]: false };
        this.thumbsUpHandler && this.thumbsUpHandler(turn);
    }

    onThumbDown(turn: any) {
        const id = turn?.id;
        if (!id) return;
        const next = this.activeThumbs[id] === 'down' ? null : 'down';
        this.activeThumbs = { ...this.activeThumbs, [id]: next } as any;

        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            // On mobile: never show inline feedback panel. Instead, toast on activation.
            this.feedbackVisibility = {
                ...this.feedbackVisibility,
                [id]: false
            };
            if (next === 'down') {
                this.showFeedbackToast();
            }
        } else {
            this.feedbackVisibility = {
                ...this.feedbackVisibility,
                [id]: next === 'down'
            };
        }
        this.thumbsDownHandler && this.thumbsDownHandler(turn);
    }

    private showFeedbackToast() {
        this.toast.openFromComponent(QDSToastComponent, {
            panelClass: ['ds-toast', '--success'],
            duration: 5000,
            verticalPosition: 'top',
            data: { message: 'Thanks for providing feedback' }
        });
    }

    onFeedback(opt: any) {
        if (opt?.action && typeof opt.action === 'function') {
            opt.action(opt);
        }
    }

    hideFeedback(id: string) {
        this.feedbackVisibility = { ...this.feedbackVisibility, [id]: false };
    }

    handleRetry(turn: any) {
        const id = turn?.id;
        if (!id) return;
        const { [id]: _removed, ...rest } = this.visibleResponses;
        this.visibleResponses = { ...rest };
        this.activeThumbs = { ...this.activeThumbs, [id]: null } as any;
        this.feedbackVisibility = { ...this.feedbackVisibility, [id]: false };
        this.copiedByTurn = { ...this.copiedByTurn, [id]: false };
        this.onRetry.emit(turn);
        // Re-schedule visibility for retried response
        this.showResponseWithDelay(id);
    }

    // --- Footer helpers ---
    autoResize() {
        const el = this.textareaRef?.nativeElement;
        if (!el) return;
        el.rows = this.minRows;
        const computed = window.getComputedStyle(el);
        const lh = parseInt(computed.lineHeight || '20', 10) || 20;
        const currentRows = Math.floor(el.scrollHeight / lh);
        if (currentRows >= this.maxRows) {
            el.rows = this.maxRows;
            el.scrollTop = el.scrollHeight;
        } else {
            el.rows = Math.max(currentRows, this.minRows);
        }
    }

    handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!this.askInputDisabled) {
                this.handleSubmit();
            }
        }
    }

    private stripHostAttributes() {
        const attrs =
            (this.el.nativeElement as any).getAttributeNames?.() || [];
        attrs.forEach((attr: string) =>
            this.renderer.removeAttribute(this.el.nativeElement, attr)
        );
    }

    // Helper to mark a turn's response visible after a delay (spinner phase)
    private showResponseWithDelay(id: string, delay?: number) {
        // Avoid scheduling twice if already visible
        if (this.visibleResponses[id]) return;
        const effectiveDelay =
            typeof delay === 'number' ? delay : this.responseLoadingDelay;
        const safeDelay = effectiveDelay >= 0 ? effectiveDelay : 0;
        setTimeout(() => {
            this.visibleResponses = { ...this.visibleResponses, [id]: true };
            this.scrollToBottom();
        }, safeDelay);
    }

    // Ensure the content area stays scrolled to the latest message
    private scrollToBottom() {
        // Allow DOM to paint new content before measuring
        requestAnimationFrame(() => {
            const el = this.chatbotContentRef?.nativeElement;
            if (!el) return;
            el.scrollTop = el.scrollHeight;
            // Update scrolled state (always true when content exceeds height)
            this.isScrolled = el.scrollTop > 0;
        });
    }
}

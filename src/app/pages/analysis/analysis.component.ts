import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexityChartComponent } from './components/complexity-chart/complexity-chart.component';
import { WritingPatternsComponent } from './components/writing-patterns/writing-patterns.component';
import { SummaryMetricsComponent } from './components/summary-metrics/summary-metrics.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { DetailedFeaturesComponent } from './components/detailed-features/detailed-features.component';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { WordDistributionChartComponent } from './components/word-distribution-chart/word-distribution-chart.component';
import { SentenceComplexityChartComponent } from './components/sentence-complexity-chart/sentence-complexity-chart.component';
import { StructuralChartComponent } from './components/structural-chart/structural-chart.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { TooltipComponent } from '../../shared/components/tooltip/tooltip.component';

interface AnalysisData {
  metadata: {
    filename: string;
    file_size: number;
    page_count: number;
    timestamp: string;
  };
  analysis: {
    style_metrics: {
      complexity: {
        score: number;
        level: string;
        components: {
          vocabulary_contribution: number;
          syntax_contribution: number;
          readability_contribution: number;
        };
      };
      consistency: {
        score: number;
        level: string;
      };
      classification: string;
    };
    writing_patterns: {
      vocabulary_usage: string;
      sentence_structure: string;
      text_organization: string;
    };
    summary_metrics: {
      readability: {
        score: number;
        interpretation: string;
      };
      vocabulary: {
        score: number;
        interpretation: string;
      };
      structure: {
        score: number;
        interpretation: string;
      };
    };
    recommendations: string[];
  };
  features: {
    lexical: {
      avg_word_length: number;
      vocabulary_richness: number;
      type_token_ratio: number;
      hapax_ratio: number;
      char_diversity: number;
      word_length_variance: number;
      unique_words_ratio: number;
      punctuation_ratio: number;
      freq_t: number;
      freq_h: number;
      freq_e: number;
      freq_r: number;
      freq_s: number;
      freq_a: number;
      freq_l: number;
      freq_o: number;
      freq_w: number;
      freq_i: number;
      freq_n: number;
      freq_b: number;
      freq_u: number;
      freq_y: number;
      freq_d: number;
      freq_m: number;
      freq_c: number;
      freq_k: number;
      freq_f: number;
      freq_v: number;
      freq_p: number;
      freq_z: number;
      freq_g: number;
      freq_q: number;
      freq_j: number;
      freq_x: number;
    };
    syntactic: {
      avg_sentence_length: number;
      sentence_complexity: number;
      avg_parse_tree_depth: number;
      parse_tree_breadth: number;
      syntactic_diversity: number;
      subordinate_clause_ratio: number;
      function_word_ratio: number;
      pos_pron: number;
      pos_verb: number;
      pos_det: number;
      pos_noun: number;
      pos_adp: number;
      pos_aux: number;
      pos_sconj: number;
      pos_cconj: number;
      pos_part: number;
      pos_adv: number;
      pos_adj: number;
      pos_propn: number;
      pos_num: number;
      pos_intj: number;
      pos_x: number;
      dep_expl: number;
      dep_root: number;
      dep_det: number;
      dep_attr: number;
      dep_acl: number;
      dep_prep: number;
      dep_dobj: number;
      dep_nsubj: number;
      dep_aux: number;
      dep_pcomp: number;
      dep_advmod: number;
      dep_advcl: number;
      dep_cc: number;
      dep_neg: number;
      dep_conj: number;
      dep_acomp: number;
      dep_amod: number;
      dep_pobj: number;
      dep_relcl: number;
      dep_dep: number;
      dep_compound: number;
      dep_ccomp: number;
      dep_xcomp: number;
      dep_poss: number;
      dep_mark: number;
      dep_prt: number;
      dep_intj: number;
      dep_appos: number;
      dep_nmod: number;
      dep_nummod: number;
      dep_auxpass: number;
      dep_nsubjpass: number;
      dep_csubj: number;
      dep_npadvmod: number;
      dep_preconj: number;
      dep_predet: number;
      dep_quantmod: number;
      dep_agent: number;
    };
    structural: {
      avg_paragraph_length: number;
      paragraph_length_variance: number;
      paragraph_count: number;
      text_density: number;
      whitespace_ratio: number;
      line_break_frequency: number;
      sentence_length_variance: number;
      avg_sentences_per_paragraph: number;
      structure_consistency: number;
    };
    readability: {
      flesch_reading_ease: number;
      flesch_kincaid_grade: number;
      gunning_fog: number;
      smog_index: number;
      automated_readability_index: number;
      average_syllables_per_word: number;
      complex_word_ratio: number;
    };
  };
}

// Add these interfaces to properly type the table data
interface MetricItem {
  label: string;
  value: string;
  key: string;
}

interface TooltipSection {
  [key: string]: string;
}

interface MetricTooltips {
  complexity: TooltipSection;
  lexical: TooltipSection;
  syntactic: TooltipSection;
  readability: TooltipSection;
  structural: TooltipSection;
  writing_patterns: TooltipSection;
  summary_metrics: TooltipSection;
  readability_additional: TooltipSection;
  parts_of_speech: TooltipSection;
}

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    ComplexityChartComponent,
    WritingPatternsComponent,
    SummaryMetricsComponent,
    RecommendationsComponent,
    DetailedFeaturesComponent,
    FileSizePipe,
    WordDistributionChartComponent,
    SentenceComplexityChartComponent,
    StructuralChartComponent,
    TooltipComponent
  ],
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalysisComponent {
  analysisData: AnalysisData = JSON.parse(localStorage.getItem('analysisData') || '{}');

  isLoading = true;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.markForCheck();
    }, 0);
  }

  analyzeNewDocument() {
    this.router.navigate(['/']);
  }

  getImpactLevel(value: number): string {
    if (value < 5) return 'Low Impact';
    if (value < 15) return 'Moderate Impact';
    return 'High Impact';
  }

  getSummaryMetrics() {
    const metrics = this.analysisData.analysis.summary_metrics;
    return [
      { name: 'Readability', score: metrics.readability.score, interpretation: metrics.readability.interpretation },
      { name: 'Vocabulary', score: metrics.vocabulary.score, interpretation: metrics.vocabulary.interpretation },
      { name: 'Structure', score: metrics.structure.score, interpretation: metrics.structure.interpretation }
    ];
  }

  getLetterFrequencies() {
    const lexical = this.analysisData.features.lexical;
    return [
      { letter: 'A', frequency: lexical.freq_a },
      { letter: 'B', frequency: lexical.freq_b },
      { letter: 'C', frequency: lexical.freq_c },
      { letter: 'D', frequency: lexical.freq_d },
      { letter: 'E', frequency: lexical.freq_e },
      { letter: 'F', frequency: lexical.freq_f },
      { letter: 'G', frequency: lexical.freq_g },
      { letter: 'H', frequency: lexical.freq_h },
      { letter: 'I', frequency: lexical.freq_i },
      { letter: 'J', frequency: lexical.freq_j },
      { letter: 'K', frequency: lexical.freq_k },
      { letter: 'L', frequency: lexical.freq_l },
      { letter: 'M', frequency: lexical.freq_m },
      { letter: 'N', frequency: lexical.freq_n },
      { letter: 'O', frequency: lexical.freq_o },
      { letter: 'P', frequency: lexical.freq_p },
      { letter: 'Q', frequency: lexical.freq_q },
      { letter: 'R', frequency: lexical.freq_r },
      { letter: 'S', frequency: lexical.freq_s },
      { letter: 'T', frequency: lexical.freq_t },
      { letter: 'U', frequency: lexical.freq_u },
      { letter: 'V', frequency: lexical.freq_v },
      { letter: 'W', frequency: lexical.freq_w },
      { letter: 'X', frequency: lexical.freq_x },
      { letter: 'Y', frequency: lexical.freq_y },
      { letter: 'Z', frequency: lexical.freq_z }
    ].sort((a, b) => b.frequency - a.frequency); // Sort by frequency
  }

  getDependencyData() {
    const syntactic = this.analysisData.features.syntactic;
    return Object.entries(syntactic)
      .filter(([key]) => key.startsWith('dep_'))
      .map(([key, value]) => ({
        label: key.replace('dep_', '').toUpperCase(),
        value: value as number
      }))
      .sort((a, b) => b.value - a.value);
  }

  getPartOfSpeechData() {
    const syntactic = this.analysisData.features.syntactic;
    return [
      { label: 'Nouns', value: syntactic.pos_noun },
      { label: 'Verbs', value: syntactic.pos_verb },
      { label: 'Adjectives', value: syntactic.pos_adj },
      { label: 'Adverbs', value: syntactic.pos_adv },
      { label: 'Pronouns', value: syntactic.pos_pron },
      { label: 'Determiners', value: syntactic.pos_det },
      { label: 'Prepositions', value: syntactic.pos_adp },
      { label: 'Auxiliaries', value: syntactic.pos_aux }
    ];
  }

  getReadabilityMetrics() {
    const readability = this.analysisData.features.readability;
    return [
      {
        label: 'Flesch Reading Ease',
        value: readability.flesch_reading_ease,
        interpretation: this.getFleschReadingEaseInterpretation(readability.flesch_reading_ease)
      },
      {
        label: 'Flesch-Kincaid Grade',
        value: readability.flesch_kincaid_grade
      },
      {
        label: 'Gunning Fog Index',
        value: readability.gunning_fog
      },
      {
        label: 'SMOG Index',
        value: readability.smog_index
      }
    ];
  }

  private getFleschReadingEaseInterpretation(score: number): string {
    if (score >= 90) return 'Very Easy';
    if (score >= 80) return 'Easy';
    if (score >= 70) return 'Fairly Easy';
    if (score >= 60) return 'Standard';
    if (score >= 50) return 'Fairly Difficult';
    if (score >= 30) return 'Difficult';
    return 'Very Difficult';
  }

  getTableData() {
    return {
      lexical: [
        {
          label: 'Type-Token Ratio',
          value: this.analysisData.features.lexical.type_token_ratio.toFixed(2),
          key: 'type_token_ratio'
        },
        {
          label: 'Hapax Ratio',
          value: this.analysisData.features.lexical.hapax_ratio.toFixed(2),
          key: 'hapax_ratio'
        },
        {
          label: 'Character Diversity',
          value: this.analysisData.features.lexical.char_diversity.toFixed(3),
          key: 'char_diversity'
        },
        {
          label: 'Word Length Variance',
          value: this.analysisData.features.lexical.word_length_variance.toFixed(1),
          key: 'word_length_variance'
        }
      ] as MetricItem[],
      syntactic: [
        {
          label: 'Parse Tree Depth',
          value: this.analysisData.features.syntactic.avg_parse_tree_depth.toFixed(1),
          key: 'parse_tree_depth'
        },
        {
          label: 'Parse Tree Breadth',
          value: this.analysisData.features.syntactic.parse_tree_breadth.toFixed(1),
          key: 'parse_tree_breadth'
        },
        {
          label: 'Syntactic Diversity',
          value: `${(this.analysisData.features.syntactic.syntactic_diversity * 100).toFixed(1)}%`,
          key: 'syntactic_diversity'
        },
        {
          label: 'Function Word Ratio',
          value: `${(this.analysisData.features.syntactic.function_word_ratio * 100).toFixed(1)}%`,
          key: 'function_word_ratio'
        }
      ] as MetricItem[],
      readability: [
        {
          label: 'Flesch Reading Ease',
          value: this.analysisData.features.readability.flesch_reading_ease.toFixed(1),
          key: 'flesch_reading_ease'
        },
        {
          label: 'Flesch-Kincaid Grade',
          value: this.analysisData.features.readability.flesch_kincaid_grade.toFixed(1),
          key: 'flesch_kincaid_grade'
        },
        {
          label: 'Gunning Fog',
          value: this.analysisData.features.readability.gunning_fog.toFixed(1),
          key: 'gunning_fog'
        },
        {
          label: 'ARI',
          value: this.analysisData.features.readability.automated_readability_index.toFixed(1),
          key: 'ari'
        }
      ] as MetricItem[]
    };
  }

  getBarWidth(value: string | number): string {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return `${Math.min(Math.max(numValue * 10, 10), 100)}%`;
  }

  getProgressRing(value: number): string {
    const circumference = 2 * Math.PI * 15.9155;
    const progress = value * circumference;
    return `${progress} ${circumference}`;
  }

  getSpeechData() {
    return [
      { label: 'Nouns', value: this.analysisData.features.syntactic.pos_noun },
      { label: 'Verbs', value: this.analysisData.features.syntactic.pos_verb },
      { label: 'Adjectives', value: this.analysisData.features.syntactic.pos_adj },
      { label: 'Adverbs', value: this.analysisData.features.syntactic.pos_adv },
      { label: 'Pronouns', value: this.analysisData.features.syntactic.pos_pron },
      { label: 'Determiners', value: this.analysisData.features.syntactic.pos_det },
      { label: 'Prepositions', value: this.analysisData.features.syntactic.pos_adp },
      { label: 'Auxiliaries', value: this.analysisData.features.syntactic.pos_aux }
    ];
  }

  getMetricTooltips(): MetricTooltips {
    return {
      complexity: {
        score: 'Overall complexity score based on vocabulary, syntax, and readability metrics',
        vocabulary: 'Contribution of vocabulary complexity to the overall score',
        syntax: 'Contribution of syntactic complexity to the overall score',
        readability: 'Contribution of readability factors to the overall score',
        vocabulary_contribution: 'Percentage contribution of vocabulary complexity to the overall score',
        syntax_contribution: 'Percentage contribution of syntactic structure complexity',
        readability_contribution: 'Percentage contribution of readability factors'
      },
      lexical: {
        type_token_ratio: 'Ratio of unique words to total words, indicating vocabulary diversity',
        hapax_ratio: 'Proportion of words that appear only once in the text',
        char_diversity: 'Measure of character variety in the text',
        word_length_variance: 'Statistical variance in word lengths',
        avg_word_length: 'Average length of words in characters',
        vocabulary_richness: 'Measure of vocabulary diversity and sophistication',
        unique_words_ratio: 'Proportion of unique words to total words',
        punctuation_ratio: 'Frequency of punctuation marks in the text'
      },
      syntactic: {
        parse_tree_depth: 'Average depth of syntactic parse trees, indicating sentence complexity',
        parse_tree_breadth: 'Average width of syntactic parse trees',
        syntactic_diversity: 'Variety of syntactic structures used',
        function_word_ratio: 'Proportion of grammatical function words to content words',
        avg_sentence_length: 'Average number of words per sentence',
        sentence_complexity: 'Measure of sentence structural complexity',
        subordinate_clause_ratio: 'Proportion of subordinate clauses to main clauses'
      },
      readability: {
        flesch_reading_ease: 'Score indicating how easy the text is to read (higher is easier)',
        flesch_kincaid_grade: 'US grade level required to understand the text',
        gunning_fog: 'Index measuring text readability based on sentence length and complex words',
        automated_readability_index: 'Readability score based on characters per word and words per sentence'
      },
      structural: {
        avg_paragraph_length: 'Average number of words per paragraph',
        paragraph_count: 'Total number of paragraphs in the document',
        text_density: 'Ratio of text content to total document space',
        whitespace_ratio: 'Proportion of whitespace in the document layout',
        avg_sentences_per_paragraph: 'Average number of sentences contained in each paragraph',
        structure_consistency: 'Measure of consistency in paragraph and sentence structure',
        paragraph_length_variance: 'Statistical variance in paragraph lengths',
        line_break_frequency: 'Frequency of line breaks in the document',
        sentence_length_variance: 'Statistical variance in sentence lengths'
      },
      writing_patterns: {
        vocabulary_usage: 'Analysis of word choice and vocabulary patterns in the text',
        sentence_structure: 'Evaluation of sentence construction and variation',
        text_organization: 'Assessment of document structure and flow'
      },
      summary_metrics: {
        readability_score: 'Overall readability score based on multiple metrics',
        vocabulary_score: 'Comprehensive score of vocabulary usage and diversity',
        structure_score: 'Score reflecting document structure and organization'
      },
      readability_additional: {
        avg_syllables: 'Average number of syllables per word in the text',
        complex_word_ratio: 'Percentage of words with three or more syllables',
        smog_index: 'Simple Measure of Gobbledygook readability formula result'
      },
      parts_of_speech: {
        nouns: 'Frequency of nouns in the text',
        verbs: 'Frequency of verbs in the text',
        adjectives: 'Frequency of adjectives in the text',
        adverbs: 'Frequency of adverbs in the text',
        pronouns: 'Frequency of pronouns in the text',
        determiners: 'Frequency of determiners (articles, demonstratives) in the text',
        prepositions: 'Frequency of prepositions in the text',
        auxiliaries: 'Frequency of auxiliary verbs in the text'
      }
    };
  }
}

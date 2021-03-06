from django.db import models
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from modelcluster.fields import ParentalKey, ParentalManyToManyField

from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.admin.edit_handlers import PageChooserPanel
from wagtail.search import index
from wagtail.core.fields import StreamField
from wagtail.core import blocks
from wagtail.admin.edit_handlers import  StreamFieldPanel
from wagtail.images.blocks import ImageChooserBlock
from wagtail.snippets.models import register_snippet
from fontawesome.fields import IconField
from wagtail.snippets.edit_handlers import SnippetChooserPanel

@register_snippet
class ArticleType(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=80)
    icon = IconField()
    panels = [
        FieldPanel('name'),
        FieldPanel('slug'),
        FieldPanel('icon'),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Type"
        verbose_name_plural = "Types"

@register_snippet
class ArticleLevel(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=80)

    panels = [
        FieldPanel('name'),
        FieldPanel('slug'),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Level"
        verbose_name_plural = "Levels"


class HomePage(Page):
    headline = RichTextField(blank=True)
    headline_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    news_page = models.ForeignKey(
        'wagtailcore.Page',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='News Page',
        help_text='Choose a page with the News'
)
    messages =RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('headline', classname="full"),
        FieldPanel('messages', classname="full"),
        PageChooserPanel('news_page', 'home.ArticleIndexPage'),
    ]
    promote_panels = [
        MultiFieldPanel(Page.promote_panels, "Common page configuration"),
        ImageChooserPanel('headline_image'),
    ]



class TopicIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

    def latest(self):
        return TopicPage.objects.child_of(self).live()
    
    def get_context(self, request):
        context = super(TopicIndexPage, self).get_context(request)

        # Get the full unpaginated listing of resource pages as a queryset -
        # replace this with your own query as appropriate
        all_resources = TopicPage.objects.live().descendant_of(self)

        paginator = Paginator(all_resources, 5) # Show 5 resources per page

        page = request.GET.get('page')
        try:
            resources = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            resources = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            resources = paginator.page(paginator.num_pages)

        # make the variable 'resources' available on the template
        context['topics'] = resources
        return context

class TopicPage(Page):
    date = models.DateField("Post date")
    body = StreamField([
        ('heading', blocks.CharBlock(classname="full title")),
        ('paragraph', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
    ])

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        StreamFieldPanel('body'),
    ]

class ArticlePage(Page):
    date = models.DateField("Post date")

    body = StreamField([
        ('heading', blocks.CharBlock(classname="full title")),
        ('paragraph', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
    ])
    typeArticle = models.ForeignKey(
        'home.ArticleType',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    content_panels = Page.content_panels + [
        FieldPanel('date'),
        StreamFieldPanel('body'),
        SnippetChooserPanel('typeArticle'),
    ]

class ArticleIndexPage(Page):
    intro = RichTextField(blank=True)
    typeArticle = models.ForeignKey(
        'home.ArticleType',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full"),
        SnippetChooserPanel('typeArticle'),
    ]

    def latest(self):
        return ArticlePage.objects.get(typeArticle=self.typeArticle).live()
    
    def get_context(self, request):
        context = super(ArticleIndexPage, self).get_context(request)

        # Get the full unpaginated listing of resource pages as a queryset -
        # replace this with your own query as appropriate
        all_resources = ArticlePage.objects.get(typeArticle=self.typeArticle).live()

        paginator = Paginator(all_resources, 5) # Show 5 resources per page

        page = request.GET.get('page')
        try:
            resources = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            resources = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            resources = paginator.page(paginator.num_pages)

        # make the variable 'resources' available on the template
        context['articles'] = resources
        return context

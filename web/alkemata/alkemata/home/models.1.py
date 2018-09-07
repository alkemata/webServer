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
        PageChooserPanel('news_page', 'home.NewsIndexPage'),
    ]
    promote_panels = [
        MultiFieldPanel(Page.promote_panels, "Common page configuration"),
        ImageChooserPanel('headline_image'),
    ]

class NewsIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

    def latest(self):
        return NewsPage.objects.child_of(self).live()
    
    def get_context(self, request):
        context = super(NewsIndexPage, self).get_context(request)

        # Get the full unpaginated listing of resource pages as a queryset -
        # replace this with your own query as appropriate
        all_resources = NewsPage.objects.live().descendant_of(self)

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
        context['news'] = resources
        return context


class NewsPage(Page):
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    body = RichTextField(blank=True)

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
        index.SearchField('body'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        FieldPanel('intro'),
        FieldPanel('body', classname="full"),
    ]

    parent_page_types = ['NewsIndexPage']
    subpage_types = []

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
        ('Articles_list', blocks.ListBlock(blocks.StructBlock([
    ('article', blocks.PageChooserBlock(required=False)),
])))
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
    content_panels = Page.content_panels + [
        FieldPanel('date'),
        StreamFieldPanel('body'),
    ]

class ArticleIndexPage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

    def latest(self):
        return ArticlePage.objects.child_of(self).live()
    
    def get_context(self, request):
        context = super(ArticleIndexPage, self).get_context(request)

        # Get the full unpaginated listing of resource pages as a queryset -
        # replace this with your own query as appropriate
        all_resources = ArticlePage.objects.live().descendant_of(self)

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

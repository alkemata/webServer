from django.db import models
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from modelcluster.fields import ParentalKey

from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.search import index


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
    
    def get_context(self, request):
        context = super(NewsIndexPage, self).get_context(request)

        # Get the full unpaginated listing of resource pages as a queryset -
        # replace this with your own query as appropriate
        all_resources = NewsPage.objects.live()

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
        context['latestnews']=all_ressources(0:5)
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

    parent_page_types = ['alkemata.NewsIndex']
    subpage_types = []
